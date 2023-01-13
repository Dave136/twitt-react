import AsideMenu from '~/components/aside-menu';

export default function BasicLayout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="container max-w-5xl mx-auto grid grid-cols-[25%_1fr]">
      <AsideMenu />
      <main className="h-screen overflow-y-auto p-0 border-r border-r-gray-700">
        {children}
      </main>
    </div>
  );
}
