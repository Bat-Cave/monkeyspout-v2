import type { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import supabase from "@/lib/supabase";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

const mapAttributesToSupabaseFields = (eventData: EventData) => {
  const {
    id,
    first_name,
    last_name,
    image_url,
    profile_image_url,
    username,
    created_at,
    updated_at,
    last_active_at,
    last_sign_in_at,
    primary_email_address_id,
    email_addresses,
    public_metadata,
  } = eventData;
  return {
    id,
    first_name,
    last_name,
    email: email_addresses?.filter(
      (email) => email.id === primary_email_address_id
    )?.[0]?.email_address,
    image_url: image_url || profile_image_url || "",
    username,
    created_at,
    updated_at,
    last_active_at,
    last_sign_in_at,
    admin: public_metadata.admin === "true",
  };
};

async function handler(request: Request) {
  const payload = (await request.json()) as EventData;
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data as unknown as EventData;

    if (!!id) {
      const supabaseData = mapAttributesToSupabaseFields({ id, ...attributes });
      const { data, error } = await supabase
        .from("users")
        .insert(supabaseData)
        .select();

      if (error) {
        return NextResponse.json(error, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }
  }

  if (eventType === "user.updated") {
    const { id, ...attributes } = evt.data as unknown as EventData;

    if (!!id) {
      const supabaseData = mapAttributesToSupabaseFields({ id, ...attributes });
      const { data, error } = await supabase
        .from("users")
        .update(supabaseData)
        .eq("id", id)
        .select();

      if (error) {
        return NextResponse.json(error, { status: 500 });
      }
      return NextResponse.json(data, { status: 200 });
    }
  }

  return NextResponse.json(
    { message: "Unable to sync user to database" },
    { status: 500 }
  );
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;

type EventData = {
  id: string;
  backup_code_enabled: boolean;
  banned: boolean;
  create_organization_enabled: true;
  created_at: number;
  delete_self_enabled: true;
  email_addresses: {
    email_address: string;
    id: string;
    linked_to: [];
    reserved: boolean;
  }[];
  external_accounts: [];
  external_id: null;
  first_name: string;
  has_image: boolean;
  image_url: string;
  last_active_at: number;
  last_name: string;
  last_sign_in_at: number;
  locked: boolean;
  lockout_expires_in_seconds: null;
  object: string;
  password_enabled: boolean;
  phone_numbers: [];
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  private_metadata: string;
  profile_image_url: string;
  public_metadata: UserPublicMetadata;
  saml_accounts: [];
  totp_enabled: boolean;
  two_factor_enabled: boolean;
  unsafe_metadata: string;
  updated_at: number;
  username: string | null;
  verification_attempts_remaining: number;
  web3_wallets: [];
};
