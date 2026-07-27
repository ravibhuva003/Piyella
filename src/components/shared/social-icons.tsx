/**
 * Custom SVG social media icons.
 * lucide-react removed brand icons, so we maintain lightweight inline SVGs.
 */

interface IconProps {
  className?: string;
}

export function IconInstagram({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTwitterX({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconFacebook({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.044 1.545.088v3.2h-1.098c-1.626 0-2.133.614-2.133 2.213v2.057h3.135l-.538 3.667h-2.597v8.024a12.053 12.053 0 0 0 4.572-1.766 11.882 11.882 0 0 0 3.558-3.559A11.893 11.893 0 0 0 23.4 12 11.926 11.926 0 0 0 12 .074 11.926 11.926 0 0 0 .6 12a11.893 11.893 0 0 0 1.597 5.87 11.882 11.882 0 0 0 3.558 3.559A11.89 11.89 0 0 0 9.1 23.69z" />
    </svg>
  );
}

export function IconPinterest({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0a12 12 0 0 0-4.373 23.178c-.07-.937-.134-2.376.028-3.4.146-.926.943-5.898.943-5.898s-.24-.482-.24-1.194c0-1.118.648-1.953 1.456-1.953.687 0 1.018.515 1.018 1.133 0 .69-.44 1.722-.666 2.677-.189.8.401 1.453 1.19 1.453 1.428 0 2.525-1.506 2.525-3.676 0-1.922-1.381-3.265-3.354-3.265-2.284 0-3.624 1.713-3.624 3.484 0 .69.266 1.428.597 1.83a.24.24 0 0 1 .056.23c-.061.253-.196.8-.223.912-.034.148-.115.18-.266.108-.992-.462-1.612-1.91-1.612-3.074 0-2.502 1.817-4.8 5.241-4.8 2.752 0 4.891 1.96 4.891 4.582 0 2.734-1.724 4.935-4.119 4.935-.804 0-1.56-.418-1.819-.912l-.494 1.884c-.179.69-.662 1.553-.986 2.08A12 12 0 1 0 12 0z" />
    </svg>
  );
}

export function IconLinkedin({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function IconYoutube({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
