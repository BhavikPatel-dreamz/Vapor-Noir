"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Loader2, CreditCard, Truck, ShoppingBag } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  updateCart,
  getCart,
  listShippingOptions,
  setShippingMethod,
  listPaymentProviders,
  createPaymentCollection,
  initiatePaymentSession,
  completeCart,
  getRegions,
  type MedusaShippingOption,
  type MedusaPaymentProvider,
  type MedusaPaymentCollection,
  type MedusaOrder,
  type MedusaRegion,
  type MedusaCompleteCartResponse,
} from "@/lib/api";

const addressSchema = z.object({
  email: z.string().email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  address: z.string().min(3, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().min(3, "Required"),
  country: z.string().regex(/^[a-zA-Z]{2}$/, "Select a valid country"),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const { items, cartId, clear, sync, pendingMutations } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [regions, setRegions] = useState<MedusaRegion[]>([]);
  const [shippingOptions, setShippingOptions] = useState<MedusaShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentProviders, setPaymentProviders] = useState<MedusaPaymentProvider[]>([]);
  const [paymentCollection, setPaymentCollection] = useState<MedusaPaymentCollection | null>(null);
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<string | null>(null);
  const [order, setOrder] = useState<MedusaOrder | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [regionId, setRegionId] = useState<string | null>(null);
  const [addressSaved, setAddressSaved] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const currency = items[0]?.currency ?? "USD";
  const total = subtotal + shippingCost;

  const availableCountries = regions.flatMap((r) =>
    r.countries.map((c) => ({ code: c.iso_2, name: c.name, regionId: r.id })),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: "" },
  });

  useEffect(() => {
    getRegions().then(setRegions).catch(console.error);
  }, []);

  const loadShippingOptions = useCallback(async () => {
    if (!cartId) return;
    setLoadingShipping(true);
    setError(null);
    try {
      const options = await listShippingOptions(cartId);
      setShippingOptions(options);
      if (options.length === 1) {
        setSelectedShipping(options[0].id);
        setShippingCost(Math.round(options[0].amount));
        await setShippingMethod(cartId, options[0].id);
      }
    } catch (err) {
      console.error("Failed to load shipping options:", err);
      setError("Failed to load shipping options.");
    } finally {
      setLoadingShipping(false);
    }
  }, [cartId]);

  const loadPaymentProviders = useCallback(async () => {
    if (!regionId) return;
    setLoadingPayment(true);
    setError(null);
    try {
      const providers = await listPaymentProviders(regionId);
      setPaymentProviders(providers.filter((p) => p.is_enabled));
    } catch (err) {
      console.error("Failed to load payment providers:", err);
      setError("Failed to load payment methods.");
    } finally {
      setLoadingPayment(false);
    }
  }, [regionId]);

  useEffect(() => {
    if (!regionId) return;
    loadPaymentProviders();
  }, [regionId, loadPaymentProviders]);

  const onAddressSubmit = async (data: AddressForm) => {
    if (!cartId) return;
    await pendingMutations();
    setSavingAddress(true);
    setError(null);
    try {
      const country = availableCountries.find((c) => c.code === data.country);
      const selectedRegionId = country?.regionId;
      setRegionId(selectedRegionId ?? null);
      await updateCart(cartId, {
        region_id: selectedRegionId,
        email: data.email,
        shipping_address: {
          first_name: data.firstName,
          last_name: data.lastName,
          address_1: data.address,
          city: data.city,
          postal_code: data.zip,
          country_code: data.country,
        },
      });
      setAddressSaved(true);
      loadShippingOptions();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleShippingSelect = async (optionId: string) => {
    if (!cartId) return;
    await pendingMutations();
    setSelectedShipping(optionId);
    const option = shippingOptions.find((o) => o.id === optionId);
    setShippingCost(option ? Math.round(option.amount) : 0);
    try {
      await setShippingMethod(cartId, optionId);
    } catch (err) {
      console.error("Failed to set shipping method:", err);
      setError("Failed to set shipping method.");
    }
  };

  const handlePaymentProviderSelect = async (providerId: string) => {
    if (!cartId) return;
    await pendingMutations();
    setSelectedPaymentProvider(providerId);
    setLoadingPayment(true);
    setError(null);
    try {
      let collection = paymentCollection;
      if (!collection) {
        collection = await createPaymentCollection(cartId);
        setPaymentCollection(collection);
      }
      await initiatePaymentSession(collection.id, providerId);
    } catch (err) {
      console.error("Failed to initialize payment:", err);
      setError("Failed to initialize payment.");
      setSelectedPaymentProvider(null);
    } finally {
      setLoadingPayment(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cartId || !selectedPaymentProvider) return;
    await pendingMutations();
    setLoading(true);
    setError(null);
    try {
      await sync();
      const currentCart = await getCart(cartId);
      if (!currentCart.items || currentCart.items.length === 0) {
        setError("Your cart is empty. Please add items before placing an order.");
        setLoading(false);
        return;
      }
      const result: MedusaCompleteCartResponse = await completeCart(cartId);
      if (result.type === "order") {
        setOrder(result.order);
        clear();
      } else {
        setError(result.error?.message || "Failed to place order.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to place order";
      if (msg.includes("shipping profiles") || msg.includes("shipping methods")) {
        setError(
          "Some items in your cart require a different shipping method. Please go back to the shipping step and select a method that covers all items, or contact support for help.",
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !order) {
    return (
      <div className="bg-white">
        <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="bg-[#E3F2FD] p-6 rounded-full">
            <ShoppingBag className="size-12 text-[#1565C0]" />
          </div>
          <h1 className="text-[28px] font-black text-[#1565C0]">Your Cart is Empty</h1>
          <p className="max-w-md text-muted-foreground">
            Add some items before checking out.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/shop"><ShoppingBag className="size-4" /> Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="bg-white">
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] border-b-4 border-[#FFC107]">
          <div className="container-x py-10 text-center">
            <CheckCircle2 className="mx-auto mb-4 size-14 text-[#FFC107]" />
            <h1 className="text-[28px] font-black text-white">Order Confirmed! 🎉</h1>
          <p className="max-w-md text-muted-foreground">
            Thank you for your order! Your order number is{" "}
            <span className="font-bold text-foreground">#{order.display_id}</span>.
            We&apos;ll send a confirmation email to{" "}
            <span className="font-bold text-foreground">{order.email}</span>.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-[#1565C0] to-[#0D47A1] border-b-4 border-[#FFC107]">
        <div className="container-x py-6">
          <h1 className="text-[28px] font-black text-white">Checkout</h1>
          <p className="text-white/70 text-sm">Complete your order securely</p>
        </div>
      </div>
      <div className="container-x py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {error && (
              <div className="border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-6">
              <Section title="Contact">
                <Field label="Email" error={errors.email?.message}>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="you@domain.com"
                  />
                </Field>
              </Section>
              <Section title="Shipping Address">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name" error={errors.firstName?.message}>
                    <Input {...register("firstName")} />
                  </Field>
                  <Field label="Last Name" error={errors.lastName?.message}>
                    <Input {...register("lastName")} />
                  </Field>
                </div>
                <Field label="Address" error={errors.address?.message}>
                  <Input {...register("address")} />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" error={errors.city?.message}>
                    <Input {...register("city")} />
                  </Field>
                  <Field label="ZIP" error={errors.zip?.message}>
                    <Input {...register("zip")} />
                  </Field>
                  <Field label="Country" error={errors.country?.message}>
                    {availableCountries.length === 0 ? (
                      <div className="flex h-11 items-center border border-border bg-white px-3 text-sm text-muted-foreground">
                        Loading countries...
                      </div>
                    ) : (
                      <select
                        {...register("country")}
                        className="flex h-11 w-full border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="">Select country</option>
                        {availableCountries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>
              </Section>
              {!addressSaved && (
                <Button type="submit" size="lg" className="w-full" disabled={savingAddress}>
                  {savingAddress ? (
                    <Loader2 className="mr-2 size-5 animate-spin" />
                  ) : (
                    <Truck className="mr-2 size-5" />
                  )}
                  {savingAddress ? "Saving address..." : "Save & Continue"}
                </Button>
              )}
            </form>

            {addressSaved && (
              <Section title="Shipping Method">
                {loadingShipping ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    Loading shipping options...
                  </div>
                ) : shippingOptions.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    No shipping options available for your address.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between border p-4 transition-colors",
                          selectedShipping === opt.id
                            ? "border-[#1565C0] bg-[#1565C0]/5"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedShipping === opt.id}
                            onChange={() => handleShippingSelect(opt.id)}
                            className="accent-[#1565C0]"
                          />
                          <div>
                            <div className="text-sm font-bold">{opt.name}</div>
                            <div className="text-xs text-muted-foreground">{opt.provider_id}</div>
                          </div>
                        </div>
                        <div className="text-sm font-bold">
                          {opt.amount === 0 ? "Free" : formatPrice(Math.round(opt.amount), currency)}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {addressSaved && selectedShipping && (
              <Section title="Payment Method">
                {loadingPayment && !selectedPaymentProvider ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    Loading payment methods...
                  </div>
                ) : paymentProviders.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No payment methods available</div>
                ) : (
                  <div className="space-y-2">
                    {paymentProviders.map((provider) => (
                      <label
                        key={provider.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 border p-4 transition-colors",
                          selectedPaymentProvider === provider.id
                            ? "border-[#1565C0] bg-[#1565C0]/5"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPaymentProvider === provider.id}
                          onChange={() => handlePaymentProviderSelect(provider.id)}
                          disabled={loadingPayment}
                          className="accent-[#1565C0]"
                        />
                        <CreditCard className="size-5 text-muted-foreground" />
                        <div className="text-sm font-bold capitalize">
                          {provider.id.replace(/^(pp_|prod_psp_)/, "").replace(/_/g, " ")}
                        </div>
                        {loadingPayment && selectedPaymentProvider === provider.id && (
                          <Loader2 className="size-4 animate-spin ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {addressSaved && selectedShipping && selectedPaymentProvider && (
              <Section title="Review Your Order">
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="text-muted-foreground">Shipping method</div>
                    <div className="font-bold">
                      {shippingOptions.find((o) => o.id === selectedShipping)?.name ?? "Standard"}
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="text-muted-foreground">Payment method</div>
                    <div className="font-bold capitalize">
                      {selectedPaymentProvider?.replace(/^(pp_|prod_psp_)/, "").replace(/_/g, " ") ?? "—"}
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {addressSaved && selectedShipping && selectedPaymentProvider && (
              <Button
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 size-5 animate-spin" />
                ) : null}
                {loading ? "Placing order..." : `Pay ${formatPrice(total, currency)}`}
              </Button>
            )}
          </div>

          <aside className="h-fit border-2 border-[#1565C0]/20 bg-[#E3F2FD] p-4 md:p-6 shadow-sm">
            <div className="mb-4 text-xs font-black uppercase text-[#1565C0] border-b-2 border-[#1565C0]/20 pb-3">
              📋 Order Summary
            </div>
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden border border-border bg-muted">
                    <Image
                      src={i.image}
                      alt={i.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center bg-[#D32F2F] text-[10px] font-bold text-white border border-white">
                      {i.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-bold">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.variantName}</div>
                  </div>
                  <div className="text-sm font-bold">{formatPrice(i.price * i.quantity, i.currency)}</div>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 && selectedShipping
                    ? "Free"
                    : selectedShipping
                      ? formatPrice(shippingCost, currency)
                      : "Calculated at next step"}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-baseline justify-between">
              <span className="font-bold">Total</span>
              <span className="text-2xl font-bold text-[#1565C0]">{formatPrice(total, currency)}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 border-2 border-[#1565C0]/20 bg-white p-6 shadow-sm">
      <div className="text-lg font-black text-[#1565C0] border-b-2 border-[#1565C0]/10 pb-3">{title}</div>
      {children}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</div>
      {children}
      {error && (
        <div className="mt-1 text-xs text-destructive">{error}</div>
      )}
    </label>
  );
}
