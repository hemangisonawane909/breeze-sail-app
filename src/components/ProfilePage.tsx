import { User, ChevronRight, LogOut, Bell, HelpCircle, Shield } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="animate-fade-in px-4 pt-6 pb-20">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gold-light flex items-center justify-center mb-3">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Guest User</h2>
        <p className="text-sm text-muted-foreground">Welcome to Vastra</p>
      </div>

      {/* Menu */}
      <div className="border rounded-lg divide-y">
        {[
          { icon: User, label: "Edit Profile" },
          { icon: Bell, label: "Notifications" },
          { icon: Shield, label: "Privacy & Security" },
          { icon: HelpCircle, label: "Help & Support" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center w-full px-4 py-3.5 hover:bg-secondary transition-colors"
          >
            <Icon className="w-5 h-5 text-muted-foreground mr-3" />
            <span className="text-sm font-medium text-foreground flex-1 text-left">
              {label}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button className="flex items-center gap-2 mt-6 mx-auto text-sm text-accent font-medium hover:opacity-80 transition-opacity">
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

      <p className="text-center text-xs text-muted-foreground mt-8">Vastra v1.0</p>
    </div>
  );
};

export default ProfilePage;
