import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

export default function AppShell() {
  return (
    <div className="min-h-dvh bg-ivory dark:bg-noir">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-ivory dark:bg-noir sm:shadow-2xl">
        <Header />
        <main className="flex-1 pb-32">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
