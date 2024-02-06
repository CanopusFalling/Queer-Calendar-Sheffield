import Form from "../components/forms/form";
import HandleEventSubmission from "./handleEventSubmission";

const formStructure = [
  {
    props: {
      label: "Event Title",
      type: "text",
      required: true,
      placeholder: "Title Your Event",
    },
    description:
      "Titles should be unique to your event and be as descriptive as possible ideally in under 130 characters. Do not include other information like date or location in this section.",
  },
  {
    props: {
      label: "Event Description",
      type: "textarea",
      required: true,
      placeholder: "Give Your Event Some Flavour",
    },
    description:
      "1-3 paragraphs to really sell an event to someone, the title has hooked them, now tell people why your event is the best! Talk about the event organiser in the 3rd person (It feels super strange if you're the organiser writing it but I promise it's worth it). For instance write '[Organiser] invites you to...' instead of 'we invite you to...'",
  },
  {
    props: {
      label: "Event Accessibility",
      type: "textarea",
      required: false,
      placeholder: "What is your event doing to be accessible?",
    },
    description:
      "We Reccommend listing accessibility measures in bullet point format and providing an email contact for accessibility queries.",
  },
  {
    props: {
      label: "Organiser Name",
      type: "text",
      required: false,
      placeholder: "Organisation or Individual",
    },
    description: "",
  },
  {
    props: {
      label: "Organiser Contact",
      type: "text",
      required: true,
      placeholder: "organiser@example.com",
    },
    description:
      "At the moment we require that all events have an organiser's contact attatched to them. It can be anonymous, it can be an email or a social media, but it has to be a valid contact that will be published on the calendar.",
  },
  {
    props: {
      label: "Organiser Social Media",
      type: "textarea",
      required: false,
      placeholder: "Tell people where to find you!",
    },
    description: "",
  },
  {
    props: {
      label: "Start Time",
      type: "datetime-local",
      required: true,
      placeholder: "-",
    },
  },
  {
    props: {
      label: "End Time",
      type: "datetime-local",
      required: false,
      placeholder: "-",
    },
  },
  {
    props: {
      label: "I Have Permission To Post This Event",
      type: "checkbox",
      required: true,
    },
    description:
      "By ticking this box you aknowledge that one of the following applies; you are the event organiser, you have permission from the event organiser or you are submitting details for an event that are already publicly availible.",
  },
  {
    props: {
      label: "Contact Name",
      type: "text",
      required: false,
      placeholder: "Enter your name",
    },
    description:
      "Not the event organiser's name, your name, the person submitting this form.",
  },
  {
    props: {
      label: "Contact Email",
      type: "email",
      required: true,
      placeholder: "Enter your contact email",
    },
    description:
      "This Email will NOT be published. This is the email we will contact you on, you will get both an initial confirmation email once you submit this form and a follow up when your event is live.",
  },
  {
    props: {
      label: "I Confirm This Is My Email And Agree To Be Contacted",
      type: "checkbox",
      required: true,
    },
  },
];

export default function Page(params: {
  params: Record<string, any>;
  searchParams: Record<string, any>;
}) {
  return (
    <main className="max-w-screen-md mx-auto my-4 p-8 rounded-xl bg-white dark:bg-inherit">
      <h1 className="text-4xl font-bold mb-4"> Add An Event </h1>
      <p className="mb-4">
        Complete the form below to add an event to the calendar. Your event will
        be reviewed by our volenteers and you will recieve an email when it is
        live.
      </p>
      {params.searchParams.success == "true" ? (
        <div className="rounded-lg p-4 text-base text-success-100 bg-success-800 mb-3">
          Your Event Has Been Successfully Submitted! You should recieve a
          confirmation email soon, remember to check your spam.
        </div>
      ) : (
        <></>
      )}
      <Form inputFields={formStructure} submitAction={HandleEventSubmission} />
    </main>
  );
}
