import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { useAuthStore } from "../stores/auth.store"


export default function TestUsers() {
  const api = useApi()
  const [users, setUsers] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  const accessToken = useAuthStore((s) => s.accessToken)
  const refreshToken = useAuthStore((s) => s.refreshToken)

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
      setError('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🔓 Test Users</h1>

      <button
        onClick={fetchUsers}
        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium shadow
                  hover:bg-blue-700 hover:shadow-lg active:scale-95
                  transition-all duration-200"
      >
        🚀 Charger les utilisateurs
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">📌 Tokens actuels</h3>
        <p><strong>Access Token:</strong> {accessToken}</p>
        <p><strong>Refresh Token:</strong> {refreshToken}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">👤 Users</h3>
        <ul className="list-disc pl-6">
          {users.map((user) => <li key={user.id}>{user.email}</li>)}
        </ul>
      </div>
    </div>
  )
}
