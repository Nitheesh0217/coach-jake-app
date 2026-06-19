"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Camera,
  Save,
  LogOut,
  AlertTriangle,
  Eye,
  EyeOff,
  Zap,
  Target,
  Calendar,
  Bell,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  updateProfile,
  updatePlayerCard,
  updatePassword,
  updateGoals,
  updateSchedule,
  signOut,
} from "@/app/(app)/settings/actions";
import type { Profile } from "@/types";

interface SettingsPageProps {
  profile: Profile;
}

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "avatar", label: "Avatar", icon: Camera },
  { id: "password", label: "Password", icon: Lock },
  { id: "player-card", label: "Player Card", icon: Target },
  { id: "goals", label: "Goals", icon: Zap },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function SettingsPage({ profile }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile form state
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    age: profile?.age || 0,
    height_cm: profile?.height_cm || 0,
    weight_kg: profile?.weight_kg || 0,
    instagram_url: profile?.instagram_url || "",
    youtube_url: profile?.youtube_url || "",
    highlight_tagline: profile?.highlight_tagline || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Player card state
  const [playerCardData, setPlayerCardData] = useState({
    player_archetype: profile?.player_archetype || "Prospect",
    playstyle_team_vs_iso: profile?.playstyle_team_vs_iso || 50,
    playstyle_shooter_vs_slasher: profile?.playstyle_shooter_vs_slasher || 50,
    playstyle_finesse_vs_power: profile?.playstyle_finesse_vs_power || 50,
  });

  // Goals state
  const [goalsData, setGoalsData] = useState({
    goals: profile?.goals ? JSON.stringify(profile.goals) : "",
    weekly_sessions_target: profile?.weekly_sessions_target || 4,
    typical_session_length_minutes:
      profile?.typical_session_length_minutes || 60,
    sleep_hours_per_night: profile?.sleep_hours_per_night || 8,
  });

  const handleProfileChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        toast.success("Password updated successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(result.error || "Failed to update password");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePlayerCard = async () => {
    setIsSaving(true);
    try {
      const result = await updatePlayerCard(playerCardData);
      if (result.success) {
        toast.success("Player card updated successfully!");
      } else {
        toast.error(result.error || "Failed to update player card");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGoals = async () => {
    setIsSaving(true);
    try {
      let parsedGoals: any = null;
      if (goalsData.goals.trim()) {
        try {
          parsedGoals = JSON.parse(goalsData.goals);
        } catch {
          // If not valid JSON, treat as string
          parsedGoals = goalsData.goals;
        }
      }

      const result = await updateGoals({
        goals: parsedGoals as any,
        weekly_sessions_target: Number(goalsData.weekly_sessions_target),
        typical_session_length_minutes: Number(
          goalsData.typical_session_length_minutes,
        ),
        sleep_hours_per_night: Number(goalsData.sleep_hours_per_night),
      });
      if (result.success) {
        toast.success("Goals updated successfully!");
      } else {
        toast.error(result.error || "Failed to update goals");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (!confirmed) return;

    try {
      const result = await signOut();
      if (result.success) {
        window.location.href = "/";
      } else {
        toast.error(result.error || "Failed to sign out");
      }
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white pb-24 md:pb-8">
      {/* Background glow animations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <motion.div {...fade(0)} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Settings
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <motion.div {...fade(0.1)} className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-4 sticky top-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                        activeTab === tab.id
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "text-zinc-300 hover:text-white hover:bg-zinc-800/50 border border-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div {...fade(0.15)} className="lg:col-span-3">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white mb-6">
                    Profile Information
                  </h2>

                  {/* Full Name */}
                  <div className="mb-6">
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) =>
                        handleProfileChange("full_name", e.target.value)
                      }
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Age, Height, Weight */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          handleProfileChange(
                            "age",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                        placeholder="Age"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.height_cm}
                        onChange={(e) =>
                          handleProfileChange(
                            "height_cm",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                        placeholder="Height"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={formData.weight_kg}
                        onChange={(e) =>
                          handleProfileChange(
                            "weight_kg",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                        placeholder="Weight"
                      />
                    </div>
                  </div>

                  {/* Instagram & YouTube URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                        Instagram URL
                      </label>
                      <input
                        type="text"
                        value={formData.instagram_url}
                        onChange={(e) =>
                          handleProfileChange("instagram_url", e.target.value)
                        }
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                        placeholder="Instagram URL"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                        YouTube URL
                      </label>
                      <input
                        type="text"
                        value={formData.youtube_url}
                        onChange={(e) =>
                          handleProfileChange("youtube_url", e.target.value)
                        }
                        className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                        placeholder="YouTube URL"
                      />
                    </div>
                  </div>

                  {/* Highlight Tagline */}
                  <div className="mb-6">
                    <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                      Highlight Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.highlight_tagline}
                      onChange={(e) =>
                        handleProfileChange("highlight_tagline", e.target.value)
                      }
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="Your highlight tagline"
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 rounded-2xl transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* AVATAR TAB */}
            {activeTab === "avatar" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-2xl font-black text-white mb-6">Avatar</h2>
                <div className="flex flex-col items-center gap-8">
                  {/* Avatar Preview */}
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-5xl font-black text-black">
                    {(profile?.full_name || "?").charAt(0).toUpperCase()}
                  </div>

                  {/* Upload Area */}
                  <div className="w-full border-2 border-dashed border-emerald-500/50 rounded-2xl p-12 text-center hover:border-emerald-400 transition-all cursor-pointer">
                    <Camera className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <p className="text-white font-bold mb-2">Change Photo</p>
                    <p className="text-zinc-500 text-sm">
                      Click to upload or drag and drop
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isSaving}
                    />
                  </div>

                  <button
                    disabled={isSaving}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isSaving ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>
              </div>
            )}

            {/* PASSWORD TAB */}
            {activeTab === "password" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-black text-white mb-6">
                  Change Password
                </h2>

                {/* Current Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="Current password"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                      placeholder="New password"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="Confirm password"
                  />
                </div>

                {/* Update Password Button */}
                <button
                  onClick={handleUpdatePassword}
                  disabled={isSaving}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 rounded-2xl transition-all disabled:opacity-50"
                >
                  {isSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            )}

            {/* PLAYER CARD TAB */}
            {activeTab === "player-card" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-black text-white mb-6">
                  Player Card
                </h2>

                {/* Archetype */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Player Archetype
                  </label>
                  <select
                    value={playerCardData.player_archetype}
                    onChange={(e) =>
                      setPlayerCardData((prev) => ({
                        ...prev,
                        player_archetype: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                  >
                    <option value="Prospect">Prospect</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Slasher">Slasher</option>
                    <option value="Playmaker">Playmaker</option>
                    <option value="Big Man">Big Man</option>
                  </select>
                </div>

                {/* Playstyle Sliders */}
                {[
                  {
                    key: "playstyle_team_vs_iso",
                    label: "Team vs ISO",
                    left: "Team",
                    right: "ISO",
                  },
                  {
                    key: "playstyle_shooter_vs_slasher",
                    label: "Shooter vs Slasher",
                    left: "Shooter",
                    right: "Slasher",
                  },
                  {
                    key: "playstyle_finesse_vs_power",
                    label: "Finesse vs Power",
                    left: "Finesse",
                    right: "Power",
                  },
                ].map((slider) => (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        {slider.label}
                      </label>
                      <span className="text-sm font-bold text-emerald-400">
                        {
                          playerCardData[
                            slider.key as keyof typeof playerCardData
                          ]
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-zinc-500 min-w-max">
                        {slider.left}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          playerCardData[
                            slider.key as keyof typeof playerCardData
                          ]
                        }
                        onChange={(e) =>
                          setPlayerCardData((prev) => ({
                            ...prev,
                            [slider.key]: parseInt(e.target.value),
                          }))
                        }
                        className="flex-1"
                      />
                      <span className="text-xs text-zinc-500 min-w-max">
                        {slider.right}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Save Button */}
                <button
                  onClick={handleSavePlayerCard}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 rounded-2xl transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}

            {/* GOALS TAB */}
            {activeTab === "goals" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-black text-white mb-6">
                  Training Goals
                </h2>

                {/* Goals Text */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Goals Description
                  </label>
                  <textarea
                    value={goalsData.goals}
                    onChange={(e) =>
                      setGoalsData((prev) => ({
                        ...prev,
                        goals: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all resize-none h-24"
                    placeholder="Describe your training goals..."
                  />
                </div>

                {/* Weekly Sessions Target */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Weekly Sessions Target
                  </label>
                  <input
                    type="number"
                    value={goalsData.weekly_sessions_target}
                    onChange={(e) =>
                      setGoalsData((prev) => ({
                        ...prev,
                        weekly_sessions_target: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>

                {/* Session Length */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Typical Session Length (minutes)
                  </label>
                  <input
                    type="number"
                    value={goalsData.typical_session_length_minutes}
                    onChange={(e) =>
                      setGoalsData((prev) => ({
                        ...prev,
                        typical_session_length_minutes:
                          parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>

                {/* Sleep Hours */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Sleep Hours Per Night
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={goalsData.sleep_hours_per_night}
                    onChange={(e) =>
                      setGoalsData((prev) => ({
                        ...prev,
                        sleep_hours_per_night: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveGoals}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm py-4 rounded-2xl transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}

            {/* SCHEDULE TAB */}
            {activeTab === "schedule" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-2xl font-black text-white mb-6">
                  Schedule
                </h2>
                <div className="rounded-xl border border-dashed border-zinc-600 p-8 text-center">
                  <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 font-bold">
                    Schedule management coming soon
                  </p>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-2xl font-black text-white mb-6">
                  Notifications
                </h2>
                <div className="rounded-xl border border-dashed border-zinc-600 p-8 text-center">
                  <Bell className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400 font-bold">
                    Notification preferences coming soon
                  </p>
                </div>
              </div>
            )}

            {/* DANGER ZONE TAB */}
            {activeTab === "danger" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="text-2xl font-black text-red-400">
                    Danger Zone
                  </h2>
                </div>

                {/* Sign Out */}
                <div className="border-t border-red-500/30 pt-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-white">Sign Out</p>
                      <p className="text-sm text-zinc-400">
                        End your current session
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Deactivate Account */}
                <div className="border-t border-red-500/30 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">Deactivate Account</p>
                      <p className="text-sm text-zinc-400">
                        Temporarily disable your account
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-sm border border-red-500/30 transition-all">
                      <AlertTriangle className="w-4 h-4" />
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
