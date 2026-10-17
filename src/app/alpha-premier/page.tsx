import { SplitStage } from '@/components/alpha-premier/SplitStage';
import { Systems } from '@/components/alpha-premier/Systems';
import { FieldPhotos } from '@/components/alpha-premier/FieldPhotos';
import { Figures } from '@/components/alpha-premier/Figures';
import { InternshipRecord } from '@/components/alpha-premier/InternshipRecord';
import { ThanksLetter } from '@/components/alpha-premier/ThanksLetter';
import { SiteFooter } from '@/components/alpha-premier/SiteFooter';

// Section order follows the page's argument (see docs/alpha-premier/BUILD-BRIEF.md):
// hero + before + ledger on the split stage, then the four systems, the photographs,
// what changed, the internship record, the thank-you letter and the footer.
export default function AlphaPremierPage() {
  return (
    <>
      <main id="main-content">
        <SplitStage />
        <Systems />
        <FieldPhotos />
        <Figures />
        <InternshipRecord />
        <ThanksLetter />
      </main>
      <SiteFooter />
    </>
  );
}
