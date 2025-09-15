import { RDSSocialLinks } from './constant'

export function SocialLinks() {
  return (
    <div className="flex space-x-4">
      {RDSSocialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-200 hover:bg-black hover:text-white"
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <social.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
