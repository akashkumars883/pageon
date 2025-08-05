import { supabase } from "@/supabaseClients";
import BusinessPage from "@/components/BusinessPage";

// SEO Metadata function
export async function generateMetadata({ params }) {
  const slug = params?.slug?.toLowerCase()?.trim();

  const { data: business } = await supabase
    .from("businesses")
    .select("name, description, logo_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!business) {
    return {
      title: "Business Not Found | Pageon",
      description: `No business found for slug "${slug}"`,
    };
  }

  return {
    title: `${business.name} | Pageon`,
    description: business.description?.slice(0, 150),
    openGraph: {
      title: `${business.name} | Pageon`,
      description: business.description?.slice(0, 150),
      images: [
        {
          url: business.logo_url,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Pageon`,
      description: business.description?.slice(0, 150),
      images: [business.logo_url],
    },
  };
}

// Page rendering
export const dynamic = "force-dynamic"; // disable static caching

export default async function Page({ params }) {
  try {
    const slug = params?.slug?.toLowerCase()?.trim();

    console.log("👉 SLUG PARAM RECEIVED:", slug);

    const { data: business, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("❌ Supabase Error:", error.message);
    }

    console.log("📦 BUSINESS FROM DB:", business);

    if (!business) {
      return (
        <div className="text-center text-red-600 p-8">
          <h2 className="text-xl font-semibold">Business not found</h2>
          <p>
            Slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
          </p>
        </div>
      );
    }

    return <BusinessPage business={business} />;
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    return (
      <div className="text-center text-red-600 p-8">
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p>{err.message}</p>
      </div>
    );
  }
}
