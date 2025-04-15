import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen pt-[100px] md:pt-32 lg:pt-36 pb-10 md:pb-16">
        {/* Main Content Section */}
        <div className="container mx-auto px-4 md:px-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-7">
              <ContactInfo />
            </div>
            <div className="lg:col-span-5 xl:col-span-5">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 