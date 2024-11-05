import { Input } from '@/components/Input';
import { Textarea } from '@/components/textarea';
import Button from '@/components/button';

export default function CratePage() {
  return (
    <main className="my-6 w-full px-6 mt-[20vh] flex grow flex-col items-center">
      <form action="" className="flex w-full max-w-[48rem] flex-col gap-4">
        <Input type="title" name="title" label="title" />
        <Input type="file" name="image"  file={"file:bg-red-500 file:rounded-full file:border-none file:px-4 file:py-1 file:text-white"} />
        <Textarea label="content" />
        <Button type="submit" size="primary" variant="primary">
          Create post
        </Button>
      </form>
    </main>
  );
}
