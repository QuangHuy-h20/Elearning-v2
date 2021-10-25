import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className='w-1/6 h-full fixed border-r border-gray-200'>
            <nav className="flex flex-col justify-between items-center w-full py-6">
        <div className="logo">
          <Link href="/">
            <a className="text-4xl tracking-tighter">Drugdev</a>
          </Link>
        </div>
        
      </nav>
        </aside>
    )
}

export default Sidebar
