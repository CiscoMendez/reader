import TaleClientWrapper from '@/components/Reader/TaleClientWrapper';
import TaleContentContextProvider from '@/contexts/talecontent-context';
import { createTaleService } from '@/lib/services/createTaleService';

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
  children: React.ReactNode;
}

export default async function TaleLayout({ params, children }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const { slug } = resolvedParams;

  const taleService = createTaleService();
  const tale = await taleService.getTale(slug);

  if (!tale || !tale.content || !tale.content.pages) {
    return <div>Content not found</div>;
  }

  return (
    <TaleContentContextProvider content={tale.content}>
      <TaleClientWrapper>{children}</TaleClientWrapper>
    </TaleContentContextProvider>
  );
}
