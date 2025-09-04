import { cn } from '@/lib/utils'
import { StrideAppLogo } from '../common/stride-app-logo'
import { PageContainer } from './page-container'

type Props = {
  children: React.ReactNode
}

export const PageContainerWithLogo = ({ children }: Props) => {
  return (
    <PageContainer className="relative grid flex-1 place-items-center bg-neutral-50">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:90px_90px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="relative z-10 mx-auto w-full max-w-md rounded border border-gray-200 bg-white/70 px-8 py-12 shadow-xs backdrop-blur-2xl">
        <div className="pb-12">
          <StrideAppLogo className="mx-auto h-16 w-16" />
        </div>

        {children}
      </div>
    </PageContainer>
  )
}
