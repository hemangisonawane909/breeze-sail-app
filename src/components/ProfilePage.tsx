import { useState } from "react";
import { User, ChevronRight, LogOut, Bell, HelpCircle, Shield, ArrowLeft, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

type ProfileSection = "main" | "edit" | "notifications" | "privacy" | "help";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [section, setSection] = useState<ProfileSection>("main");

  // Edit form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  const openEdit = () => {
    setFullName(profile?.full_name || "");
    setPhone(profile?.phone || "");
    setAddress(profile?.address || "");
    setCity(profile?.city || "");
    setPincode(profile?.pincode || "");
    setSection("edit");
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({ full_name: fullName, phone, address, city, pincode });
      toast.success("Profile updated!");
      setSection("main");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email || "User";

  const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <button onClick={() => setSection("main")} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>
      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
    </div>
  );

  if (section === "edit") {
    return (
      <div className="animate-fade-in px-4 pt-6 pb-20">
        <BackHeader title="Edit Profile" />
        <div className="space-y-4">
          {[
            { label: "Full Name", value: fullName, set: setFullName, type: "text" },
            { label: "Phone", value: phone, set: setPhone, type: "tel" },
            { label: "Address", value: address, set: setAddress, type: "text" },
            { label: "City", value: city, set: setCity, type: "text" },
            { label: "Pincode", value: pincode, set: setPincode, type: "text" },
          ].map(({ label, value, set, type }) => (
            <div key={label}>
              <label className="text-xs font-medium text-muted-foreground">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full mt-1 px-3 py-2.5 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            disabled={updateProfile.isPending}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    );
  }

  if (section === "notifications") {
    return (
      <div className="animate-fade-in px-4 pt-6 pb-20">
        <BackHeader title="Notifications" />
        <div className="border rounded-lg divide-y">
          {[
            { label: "Order Updates", desc: "Get notified about order status changes" },
            { label: "Promotions", desc: "Receive deals and discount alerts" },
            { label: "New Arrivals", desc: "Be the first to know about new sarees" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">Notification preferences are saved locally.</p>
      </div>
    );
  }

  if (section === "privacy") {
    return (
      <div className="animate-fade-in px-4 pt-6 pb-20">
        <BackHeader title="Privacy & Security" />
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-display font-semibold text-foreground mb-2">Data Privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your personal data is securely stored and encrypted. We never share your information with third parties without your consent. All transactions are processed over secure HTTPS connections.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-display font-semibold text-foreground mb-2">Account Security</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your account is protected with email-based authentication. We recommend using a strong, unique password for your Vastra account.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-display font-semibold text-foreground mb-2">Cookie Policy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use essential cookies only to keep you signed in and maintain your shopping session. No tracking or advertising cookies are used.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (section === "help") {
    return (
      <div className="animate-fade-in px-4 pt-6 pb-20">
        <BackHeader title="Help & Support" />
        <div className="space-y-4">
          {[
            { q: "How do I place an order?", a: "Browse sarees, add to bag, and proceed to checkout. Fill in your delivery details and confirm." },
            { q: "What payment methods are accepted?", a: "We currently support Cash on Delivery (COD) for all orders." },
            { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days across India." },
            { q: "Can I return or exchange?", a: "Yes, we offer 7-day returns for unused sarees in original packaging." },
            { q: "How do I contact support?", a: "Email us at support@vastra.in or call +91-9876543210 (Mon-Sat, 10AM-6PM)." },
          ].map(({ q, a }) => (
            <div key={q} className="border rounded-lg p-4">
              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{q}</h3>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main profile view
  return (
    <div className="animate-fade-in px-4 pt-6 pb-20">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gold-light flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">{displayName}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-12 bg-secondary rounded-lg" />)}
        </div>
      ) : (
        <div className="border rounded-lg divide-y">
          {[
            { icon: User, label: "Edit Profile", action: openEdit },
            { icon: Bell, label: "Notifications", action: () => setSection("notifications") },
            { icon: Shield, label: "Privacy & Security", action: () => setSection("privacy") },
            { icon: HelpCircle, label: "Help & Support", action: () => setSection("help") },
          ].map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex items-center w-full px-4 py-3.5 hover:bg-secondary transition-colors"
            >
              <Icon className="w-5 h-5 text-muted-foreground mr-3" />
              <span className="text-sm font-medium text-foreground flex-1 text-left">{label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 mt-6 mx-auto text-sm text-accent font-medium hover:opacity-80 transition-opacity"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      <p className="text-center text-xs text-muted-foreground mt-8">Vastra v1.0</p>
    </div>
  );
};

export default ProfilePage;
