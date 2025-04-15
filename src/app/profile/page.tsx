import { FormControl, FormInput } from "@/components";

export default function Profile() {
  return (
    <div className="h-full w-full rounded-2xl lg:w-3/4 md:px-8 px-4 pb-8 mt-3 md:mt-0 bg-white text-gray-800">
      <h1 className="text-2xl font-bold text-amber-500 mb-4">Profile</h1>
      <form>
        <FormControl label="Name">
          <FormInput type="text" />
        </FormControl>
      </form>
    </div>
  );
}
