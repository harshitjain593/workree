"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { logout } from "@/redux/features/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, Lock, User, Trash2, CheckCircle, Shield, Zap, Smartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  const [activeTab, setActiveTab] = useState("account")
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Account settings
  const [accountForm, setAccountForm] = useState({
    name: "",
    email: "",
    username: "",
  })

  // Password settings
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    applications: true,
    profileViews: true,
    jobRecommendations: true,
    networkUpdates: true,
    marketingEmails: false,
    emailDigest: "daily",
    pushNotifications: true,
    smsNotifications: false,
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    showOnlineStatus: true,
    allowProfileIndexing: true,
    twoFactorAuth: false,
    loginAlerts: true,
  })

  // Subscription settings
  const [currentPlan, setCurrentPlan] = useState("free")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user) {
      setAccountForm({
        name: user.name || "",
        email: user.email || "",
        username: user.name?.toLowerCase().replace(/\s/g, "") || "",
      })
    }
  }, [isAuthenticated, user, router])

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSaveSettings = () => {
    // In a real app, we would dispatch an action to save the settings
    console.log("Saving settings...")
    setSaveSuccess(true)

    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  const handleDeleteAccount = () => {
    // In a real app, we would show a confirmation dialog and then delete the account
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...")
      dispatch(logout())
      router.push("/")
    }
  }

  const handleUpgradePlan = (plan: string) => {
    // In a real app, we would redirect to a payment page
    router.push(`/pricing?plan=${plan}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {saveSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
          <AlertDescription className="text-green-800">Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "account" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button
                  variant={activeTab === "password" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "privacy" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button
                  variant={activeTab === "subscription" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("subscription")}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Subscription
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={accountForm.name} onChange={handleAccountChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={accountForm.email}
                    onChange={handleAccountChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={accountForm.username} onChange={handleAccountChange} />
                  <p className="text-sm text-gray-500">
                    This will be your profile URL: jobconnect.pro/{accountForm.username}
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Connected Accounts</h3>
                  <p className="text-sm text-gray-500">
                    Connect your accounts to enable single sign-on and import your professional information.
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Facebook</h4>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Twitter</h4>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-gray-500">Connected as johndoe</p>
                        </div>
                      </div>
                      <Button variant="outline">Disconnect</Button>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="pt-4">
                  <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#0077B5] hover:bg-[#005885]">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "password" && (
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Password Requirements</h3>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Minimum 8 characters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      At least one lowercase letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      At least one special character
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#0077B5] hover:bg-[#005885]">
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Messages</h3>
                      <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                    </div>
                    <Switch
                      checked={notificationSettings.messages}
                      onCheckedChange={() => handleNotificationToggle("messages")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Job Applications</h3>
                      <p className="text-sm text-gray-500">Receive updates about your job applications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.applications}
                      onCheckedChange={() => handleNotificationToggle("applications")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Views</h3>
                      <p className="text-sm text-gray-500">Get notified when someone views your profile</p>
                    </div>
                    <Switch
                      checked={notificationSettings.profileViews}
                      onCheckedChange={() => handleNotificationToggle("profileViews")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Job Recommendations</h3>
                      <p className="text-sm text-gray-500">Receive personalized job recommendations</p>
                    </div>
                    <Switch
                      checked={notificationSettings.jobRecommendations}
                      onCheckedChange={() => handleNotificationToggle("jobRecommendations")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Network Updates</h3>
                      <p className="text-sm text-gray-500">Get updates about your network connections</p>
                    </div>
                    <Switch
                      checked={notificationSettings.networkUpdates}
                      onCheckedChange={() => handleNotificationToggle("networkUpdates")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Receive promotional emails and offers</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-4">Notification Channels</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Receive text messages for important updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-2">Email Digest Frequency</h3>
                  <p className="text-sm text-gray-500 mb-4">How often would you like to receive email summaries?</p>
                  <RadioGroup
                    value={notificationSettings.emailDigest}
                    onValueChange={(value) => setNotificationSettings((prev) => ({ ...prev, emailDigest: value }))}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#0077B5] hover:bg-[#005885]">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security Settings</CardTitle>
                <CardDescription>Control your privacy and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Profile Visibility</h3>
                  <RadioGroup
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => setPrivacySettings((prev) => ({ ...prev, profileVisibility: value }))}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="public" id="public" className="mt-1" />
                      <div>
                        <Label htmlFor="public" className="font-medium">
                          Public
                        </Label>
                        <p className="text-sm text-gray-500">Anyone can view your profile</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="connections" id="connections" className="mt-1" />
                      <div>
                        <Label htmlFor="connections" className="font-medium">
                          Connections Only
                        </Label>
                        <p className="text-sm text-gray-500">Only your connections can view your profile</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="private" id="private" className="mt-1" />
                      <div>
                        <Label htmlFor="private" className="font-medium">
                          Private
                        </Label>
                        <p className="text-sm text-gray-500">Only you can view your profile</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Contact Information</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Email Address</h4>
                      <p className="text-sm text-gray-500">Make your email visible to others</p>
                    </div>
                    <Switch
                      checked={privacySettings.showEmail}
                      onCheckedChange={() => handlePrivacyToggle("showEmail")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Phone Number</h4>
                      <p className="text-sm text-gray-500">Make your phone number visible to others</p>
                    </div>
                    <Switch
                      checked={privacySettings.showPhone}
                      onCheckedChange={() => handlePrivacyToggle("showPhone")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Allow Messaging</h4>
                      <p className="text-sm text-gray-500">Let others send you messages</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowMessaging}
                      onCheckedChange={() => handlePrivacyToggle("allowMessaging")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Online Status</h4>
                      <p className="text-sm text-gray-500">Let others see when you're online</p>
                    </div>
                    <Switch
                      checked={privacySettings.showOnlineStatus}
                      onCheckedChange={() => handlePrivacyToggle("showOnlineStatus")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Allow Profile Indexing</h4>
                      <p className="text-sm text-gray-500">Let search engines index your profile</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowProfileIndexing}
                      onCheckedChange={() => handlePrivacyToggle("allowProfileIndexing")}
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Security</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={privacySettings.twoFactorAuth}
                      onCheckedChange={() => handlePrivacyToggle("twoFactorAuth")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login Alerts</h4>
                      <p className="text-sm text-gray-500">Get notified of new logins to your account</p>
                    </div>
                    <Switch
                      checked={privacySettings.loginAlerts}
                      onCheckedChange={() => handlePrivacyToggle("loginAlerts")}
                    />
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Login Activity
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="font-medium mb-2">Data & Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Manage Cookies
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Privacy Policy
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#0077B5] hover:bg-[#005885]">
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "subscription" && (
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>Upgrade your account to access premium features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className={`border-2 ${currentPlan === "free" ? "border-[#0077B5]" : "border-gray-200"}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Free</CardTitle>
                      <CardDescription>Basic features for job seekers</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">$0</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Create a professional profile</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Apply to jobs</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Basic job recommendations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Limited messaging</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {currentPlan === "free" ? (
                        <Button disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" onClick={() => setCurrentPlan("free")}>
                          Downgrade
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  <Card className={`border-2 ${currentPlan === "premium" ? "border-[#0077B5]" : "border-gray-200"}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Premium</CardTitle>
                          <CardDescription>Enhanced features for serious job seekers</CardDescription>
                        </div>
                        <Badge>Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">$9.99</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>All Free features</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>See who viewed your profile</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Advanced job recommendations</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Unlimited messaging</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Featured profile for recruiters</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {currentPlan === "premium" ? (
                        <Button disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-[#0077B5] hover:bg-[#005885]"
                          onClick={() => handleUpgradePlan("premium")}
                        >
                          Upgrade
                        </Button>
                      )}
                    </CardFooter>
                  </Card>

                  <Card className={`border-2 ${currentPlan === "business" ? "border-[#0077B5]" : "border-gray-200"}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Business</CardTitle>
                      <CardDescription>Advanced features for professionals</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-4">
                        <span className="text-3xl font-bold">$29.99</span>
                        <span className="text-gray-500">/month</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>All Premium features</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>InMail credits to contact anyone</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Advanced analytics and insights</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Applicant tracking tools</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Priority customer support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {currentPlan === "business" ? (
                        <Button disabled className="w-full">
                          Current Plan
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-[#0077B5] hover:bg-[#005885]"
                          onClick={() => handleUpgradePlan("business")}
                        >
                          Upgrade
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Billing Information</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Your subscription will automatically renew at the end of each billing period. You can cancel anytime
                    from your account settings.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Update Payment Method
                    </Button>
                    <Button variant="outline" size="sm">
                      Billing History
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
