import ContactForm from "@/components/contact/ContactForm";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import UserLayout from "@/layout/clienLayout/UserLayout";


export default function ContactPage() {
  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-20 text-gray-700">
        <ContactHeader />
        <ContactInfoCard />
        <ContactForm />
      </div>
    </UserLayout>
  );
}
