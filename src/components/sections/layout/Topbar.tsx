"use client";

import { useState, useEffect } from "react";
import { Menu, Search, Bell, Settings, X, Save, Shield, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface TopbarProps {
  coachName: string;
  onMenuClick: () => void;
}

interface NotificationItem {
  id: string;
  created_at: string;
  athleteName?: string;
  workoutTitle?: string;
  type: "assignment" | "completion";
}

interface WorkoutLogNotification {
  id: string;
  created_at: string;
  profiles: { full_name: string | null } | null;
  workouts: { title: string | null } | null;
}

interface WorkoutAssignmentNotification {
  id: string;
  created_at: string;
  workouts: { title: string | null } | null;
}

export default function Topbar({ coachName, onMenuClick }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("settings") === "true") {
      setSettingsOpen(true);
    } else {
      setSettingsOpen(false);
    }
    if (searchParams.get("notifications") === "true") {
      setNotificationsOpen(true);
    } else {
      setNotificationsOpen(false);
    }
  }, [searchParams]);

  const closeSettings = () => {
    setSettingsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("settings");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("notifications");
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Profile fields state
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState<"athlete" | "coach" | "">("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [playerArchetype, setPlayerArchetype] = useState("");
  const [playstyleTeam, setPlaystyleTeam] = useState(50);
  const [playstyleShooter, setPlaystyleShooter] = useState(50);
  const [playstyleFinesse, setPlaystyleFinesse] = useState(50);
  const [isSaving, setIsSaving] = useState(false);

  const supabase = supabaseBrowser();

  useEffect(() => {
    async function loadInitialData() {
      // 1. Get auth user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      // 2. Fetch full profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        setUserRole(profile.role);
        setFullName(profile.full_name || "");
        setAge(profile.age ? String(profile.age) : "");
        setHeight(profile.height_cm ? String(profile.height_cm) : "");
        setWeight(profile.weight_kg ? String(profile.weight_kg) : "");
        setPlayerArchetype(profile.player_archetype || "Prospect");
        setPlaystyleTeam(profile.playstyle_team_vs_iso ?? 50);
        setPlaystyleShooter(profile.playstyle_shooter_vs_slasher ?? 50);
        setPlaystyleFinesse(profile.playstyle_finesse_vs_power ?? 50);

        // 3. Fetch notifications based on role
        if (profile.role === "coach") {
          // Coaches see athlete workout completions
          const { data: logs } = await supabase
            .from("workout_logs")
            .select("id, created_at, profiles(full_name), workouts(title)")
            .order("created_at", { ascending: false })
            .limit(5);

          if (logs) {
            const mapped: NotificationItem[] = (logs as unknown as WorkoutLogNotification[]).map((log) => ({
              id: log.id,
              created_at: log.created_at,
              athleteName: log.profiles?.full_name || "An athlete",
              workoutTitle: log.workouts?.title || "Workout",
              type: "completion",
            }));
            setNotifications(mapped);
            setUnreadCount(mapped.length);
          }
        } else {
          // Athletes see coach workout assignments
          const { data: assignments } = await supabase
            .from("workout_assignments")
            .select("id, created_at, workouts(title)")
            .eq("athlete_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

          if (assignments) {
            const mapped: NotificationItem[] = (assignments as unknown as WorkoutAssignmentNotification[]).map((asgn) => ({
              id: asgn.id,
              created_at: asgn.created_at,
              athleteName: "Coach Jake",
              workoutTitle: asgn.workouts?.title || "Workout Plan",
              type: "assignment",
            }));
            setNotifications(mapped);
            setUnreadCount(mapped.length);
          }
        }
      }
    }

    loadInitialData();
  }, []);

  const handleSaveSettings = async () => {
    if (!userId) return;
    setIsSaving(true);

    try {
      const updates = {
        full_name: fullName || null,
        age: age ? parseInt(age, 10) : null,
        height_cm: height ? parseInt(height, 10) : null,
        weight_kg: weight ? parseFloat(weight) : null,
        player_archetype: playerArchetype || null,
        playstyle_team_vs_iso: playstyleTeam,
        playstyle_shooter_vs_slasher: playstyleShooter,
        playstyle_finesse_vs_power: playstyleFinesse,
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", userId);

      if (error) {
        toast.error(`Update failed: ${error.message}`);
      } else {
        toast.success("Profile telemetry updated successfully!");
        setSettingsOpen(false);
        // Force refresh to update data charts
        window.location.reload();
      }
    } catch (err) {
      toast.error("An error occurred during save.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800 bg-transparent/80 backdrop-blur-xl">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left menu trigger */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-zinc-800 rounded-xl transition text-zinc-400 hover:text-zinc-200 border border-white/5 bg-zinc-950/20"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:block">
            <h2 className="text-sm font-black text-white uppercase tracking-widest leading-none">
              {userRole === "coach" ? "Coach Dashboard" : "Athlete Roster Hub"}
            </h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">
              Active Connection // {coachName}
            </p>
          </div>
        </div>

        {/* Center Search */}
        <div className="hidden sm:flex relative flex-1 md:flex-initial md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search athletes or telemetry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-white/5 bg-zinc-950/40 pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-700 focus-visible:outline-none focus-visible:border-emerald-500/30 transition-all duration-200"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative">
          
          {/* Notifications bell */}
          <button
            onClick={() => {
              const newVal = !notificationsOpen;
              const params = new URLSearchParams(searchParams.toString());
              if (newVal) {
                params.set("notifications", "true");
                params.delete("settings");
              } else {
                params.delete("notifications");
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className={`relative p-2.5 rounded-xl border transition-all duration-200 ${
              notificationsOpen 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-zinc-950/40 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            )}
          </button>

          {/* Settings cog */}
          <button
            onClick={() => {
              const newVal = !settingsOpen;
              const params = new URLSearchParams(searchParams.toString());
              if (newVal) {
                params.set("settings", "true");
                params.delete("notifications");
              } else {
                params.delete("settings");
              }
              router.replace(`${pathname}?${params.toString()}`);
            }}
            className={`p-2.5 rounded-xl border transition-all duration-200 ${
              settingsOpen 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-zinc-950/40 border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/10"
            }`}
            aria-label="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          {/* Profile badge */}
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs font-black text-emerald-400 uppercase tracking-widest shadow-md">
            {coachName.charAt(0).toUpperCase()}
          </div>

          {/* ── NOTIFICATIONS DROPDOWN PANEL ── */}
          <AnimatePresence>
            {notificationsOpen && (
              <>
                {/* Backdrop overlay to close */}
                <div className="fixed inset-0 z-40" onClick={closeNotifications} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-12 w-80 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl p-4 shadow-2xl z-50 mt-1"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live Team Feed</span>
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[9px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300"
                    >
                      Clear Badge
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {notifications.length > 0 ? (
                      notifications.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-2.5 p-2 rounded-xl bg-zinc-900/40 border border-white/5 text-xs text-zinc-400 hover:border-white/10 transition-all"
                        >
                          <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bell className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="leading-normal">
                              {item.type === "completion" ? (
                                <>
                                  <strong className="text-white">{item.athleteName}</strong> completed{" "}
                                  <strong className="text-emerald-400">{item.workoutTitle}</strong>
                                </>
                              ) : (
                                <>
                                  <strong className="text-white">{item.athleteName}</strong> assigned new workout:{" "}
                                  <strong className="text-emerald-400">{item.workoutTitle}</strong>
                                </>
                              )}
                            </p>
                            <span className="text-[9px] text-zinc-600 block mt-1">
                              {new Date(item.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-zinc-600 text-xs font-semibold">
                        No notifications recorded.
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── SETTINGS OVERLAY MODAL ── */}
          <AnimatePresence>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={closeSettings} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl z-50"
                >
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-base font-black text-white uppercase tracking-widest">Profile Telemetry Config</h3>
                    </div>
                    <button
                      onClick={closeSettings}
                      className="p-1.5 rounded-xl border border-white/5 bg-zinc-900/50 text-zinc-500 hover:text-white transition-all"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Age</label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                          placeholder="Age"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Height (cm)</label>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                          placeholder="Height"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Weight (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                          placeholder="Weight"
                        />
                      </div>
                    </div>

                    {/* Athlete playstyle sliders */}
                    {userRole === "athlete" && (
                      <div className="pt-4 border-t border-white/5 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Playstyle Config (Radar metrics)</span>

                        {/* Archetype Select */}
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Player Archetype</label>
                          <select
                            value={playerArchetype}
                            onChange={(e) => setPlayerArchetype(e.target.value)}
                            className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:border-emerald-500/40 focus:outline-none transition-all"
                          >
                            <option value="Playmaker">Playmaker</option>
                            <option value="Scorer">Scorer</option>
                            <option value="Two-Way Wing">Two-Way Wing</option>
                            <option value="Interior Anchor">Interior Anchor</option>
                            <option value="Rim Protector">Rim Protector</option>
                          </select>
                        </div>

                        {/* Slider 1 */}
                        <div>
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                            <span>Team-First</span>
                            <span className="text-emerald-400">{playstyleTeam}% ISO</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={playstyleTeam}
                            onChange={(e) => setPlaystyleTeam(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                          />
                        </div>

                        {/* Slider 2 */}
                        <div>
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                            <span>Pure Shooter</span>
                            <span className="text-emerald-400">{playstyleShooter}% Slasher</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={playstyleShooter}
                            onChange={(e) => setPlaystyleShooter(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                          />
                        </div>

                        {/* Slider 3 */}
                        <div>
                          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">
                            <span>Finesse</span>
                            <span className="text-emerald-400">{playstyleFinesse}% Power</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={playstyleFinesse}
                            onChange={(e) => setPlaystyleFinesse(Number(e.target.value))}
                            className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={closeSettings}
                      className="px-5 py-3 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
