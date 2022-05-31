import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import Icon from '../Icon/Icon';
import LocaleSwitch from '../LocaleSwitch/LocaleSwitch';
import Logo from '../Logo/Logo';
import { useRouter } from 'next/router';

const Navbar = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo for HUSET */}
        <Link href="/">
          <a aria-label="hjem" style={{ width: '100px' }}>
            <Logo />
          </a>
        </Link>
        <nav className={!isOpen && styles.hidden}>
          <ul>
            {navigation?.map((nav) => (
              <li key={nav.id} onClick={() => setIsOpen(false)}>
                <Link href={nav.attributes.slug}>
                  <a
                    className={
                      nav?.attributes?.slug === router.asPath
                        ? styles.active
                        : null
                    }
                  >
                    {nav.attributes.title}
                  </a>
                </Link>
              </li>
            ))}

            <li className={styles.locale}>
              <LocaleSwitch />
            </li>
          </ul>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="meny">
          {!isOpen && <Icon type="menu" />}
          {isOpen && <Icon type="x" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
