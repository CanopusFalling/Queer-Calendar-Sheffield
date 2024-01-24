export default function AddEvent() {
  async function sendEventInfo(formData: FormData) {
    "use server";
  }
  return (
    <div className="max-w-screen-md mx-auto my-4 p-8 rounded-xl bg-white dark:bg-inherit">
      <h1 className="text-4xl font-bold mb-4">Add An Event</h1>
      <p className="mb-4">
        Complete the form below to add an event to the calendar. Your event will
        be reviewed by our volenteers and you will recieve an email when it is
        live.
      </p>
      <form action={sendEventInfo}>
        <input
          type="text"
          name="Contact Email"
          placeholder="your.email@example.com"
          required={true}
        />
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
