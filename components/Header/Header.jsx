// import React, { Fragment } from 'react'
// import Link from 'next/Link'
// import styles from '../styles/Header.module.css'
// function Header() {
//     return (
//         <Fragment>
//             <nav className={styles.mainnav}>
//                 <ul className={styles.list_group}>
//                     <Link href="/"><li className={styles.list_item}>HOME</li></Link>
//                     <Link href="/blog"><li className={styles.list_item}>BLOG</li></Link>
//                     <Link href="/contact"><li className={styles.list_item}>CONTACT</li></Link>
//                     <Link href="/news"><li className={styles.list_item}>NEWS</li></Link>
//                     <Link href="/about"><li className={styles.list_item}>ABOUT</li></Link>
//                 </ul>
//             </nav>
//         </Fragment>

//     )
// }

// export default Header



import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '@/styles/header.module.css'; // Import your CSS module

function Header() {
  const router = useRouter();

  const isLinkActive = (href) => router.pathname === href;

  return (
    <>
      <div className='flex justify-between items-center px-2 py-3 bg-blue-900 text-cyan-300 z-50 sm:font-sans '>

        <div className='flex justify-center items-center gap-5 mx-auto'>
          <div className={isLinkActive('/') ? `${styles.menu}` : ''}>
            <Link href='/'>Home</Link>
          </div>


        </div>
      </div>
    </>
  )
}

export default Header