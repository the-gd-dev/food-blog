import { Button, FormControl, FormInput, FormTextArea } from "@/components";

export default function Feedback() {
  return (
    <div className="h-full w-full rounded-2xl lg:w-4/5 md:px-6 mt-3 md:mt-0">
      <div className="w-full max-w-2xl mx-auto rounded-2xl px-4 pb-8 md:px-8 bg-white text-gray-800">
        <h1 className="text-xl font-bold text-amber-500 mb-4">
          We’d Love Your Feedback!
        </h1>
        <p className="text-base md:text-lg mb-6">
          Your thoughts help make this blog tastier every day. Whether you loved
          a recipe, found a typo, or just want to say hi — we’re all ears (and
          spoons).
        </p>

        <form className="space-y-4">
          <FormControl label="Full Name">
            <FormInput
              name="name"
              type="text"
              placeholder="FirstName LastName"
            />
          </FormControl>
          <FormControl label="Email (optional)">
            <FormInput
              name="email"
              type="email"
              placeholder="name@example.com"
            />
          </FormControl>
          <FormControl label="Your Feedback">
            <FormTextArea
              id="feedback"
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Let us know what’s on your mind..."
            />
          </FormControl>
          <Button type="button">Submit Feedback</Button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          We may use your feedback to improve the blog. No data is shared with
          third parties. Ever.
        </p>
      </div>
    </div>
  );
}
