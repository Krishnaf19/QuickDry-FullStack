import React, { useEffect, useState } from "react"
import { User, KeyRound, LogOut, Pencil } from "lucide-react"
import { getCurrentUser, updateAccountDetails, updateImage, updatePassword } from "../api/user.api"

const navItems = [
  { name: "Profile", icon: User },
  { name: "Change Password", icon: KeyRound },
]
const emptyPwd = { old: "", next: "", confirm: "" }

function Profile({ onLogout }) {

  const [user, setUser] = useState(null)
  const [active, setActive] = useState("Profile")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pwdSaving, setPwdSaving] = useState(false)
  const [form, setForm] = useState({ fullName: "", phoneNumber: "", userAddress: "" })
  const [preview, setPreview] = useState("")
  const [pwd, setPwd] = useState(emptyPwd)

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data)
        setForm({
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          userAddress: data.userAddress
        })
        setPreview(data.image)
      })
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [])

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const setPwdField = (key) => (e) => setPwd((p) => ({ ...p, [key]: e.target.value }))

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    const body = new FormData()
    body.append("image", file)

    try {
      const updated = await updateImage(body)
      setUser(updated)
      setPreview(updated.image)
      alert("Image Updated")
    } catch (err) {
      console.log(err)
    }
  }

  const handleSaveDetails = async () => {
    try {
      setSaving(true)
      const updated = await updateAccountDetails({ ...form, email: user.email })
      setUser(updated)
      alert("Profile Updated")
    } catch (err) {
      alert("Unable to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancelDetails = () =>
    setForm({ fullName: user.fullName, phoneNumber: user.phoneNumber, userAddress: user.userAddress })

  const handleSavePassword = async () => {
    if (pwd.next !== pwd.confirm) return alert("Passwords do not match")

    try {
      setPwdSaving(true)
      await updatePassword(pwd.old, pwd.next)
      alert("Password Updated")
      setPwd(emptyPwd)
    } catch (err) {
      alert("Password update failed")
    } finally {
      setPwdSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="mt-10 mb-10 bg-white">
      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-[220px_1fr] gap-8">
        <aside>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mt-5">
                {preview ? (
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="m-auto mt-7" size={35} />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                <Pencil size={14} />
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <h3 className="mt-4 font-semibold">{user.email}</h3>
            <p className="text-gray-500">{user.role}</p>
          </div>

          <div className="mt-8 space-y-2">
            {navItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`flex gap-2 w-full p-2 rounded-2xl ${active === name ? "bg-black text-white" : ""}`}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
            <button onClick={onLogout} className="flex gap-2 w-full p-2 rounded">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {active === "Profile" ? (
          <section>
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="space-y-5">
              <input className="w-full border border-gray-400 p-3 rounded-2xl" placeholder="Full Name" value={form.fullName} onChange={setField("fullName")} />
              <input className="w-full border border-gray-400 p-3 rounded-2xl" placeholder="Phone Number" value={form.phoneNumber} onChange={setField("phoneNumber")} />
              <input className="w-full border border-gray-400 p-3 rounded-2xl" placeholder="Address" value={form.userAddress} onChange={setField("userAddress")} />
              <input disabled className="w-full border-gray-400 p-3 rounded-2xl bg-gray-100" value={user.email} />

              <div className="flex gap-4">
                <button onClick={handleSaveDetails} className="bg-black text-white px-6 py-3 rounded-full">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancelDetails} className="border px-6 py-3 rounded-full">
                  Cancel
                </button>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <div className="space-y-5">
              <input type="password" className="w-full border p-3 rounded" placeholder="Old Password" value={pwd.old} onChange={setPwdField("old")} />
              <input type="password" className="w-full border p-3 rounded" placeholder="New Password" value={pwd.next} onChange={setPwdField("next")} />
              <input type="password" className="w-full border p-3 rounded" placeholder="Confirm Password" value={pwd.confirm} onChange={setPwdField("confirm")} />

              {pwd.confirm && pwd.next !== pwd.confirm && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleSavePassword}
                  disabled={pwdSaving || !pwd.old || !pwd.next || pwd.next !== pwd.confirm}
                  className="bg-black text-white px-6 py-3 rounded disabled:opacity-50"
                >
                  {pwdSaving ? "Saving..." : "Update Password"}
                </button>
                <button onClick={() => setPwd(emptyPwd)} className="border px-6 py-3 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Profile