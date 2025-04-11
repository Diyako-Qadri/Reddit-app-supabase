'use client';

import { useMutation } from "@tanstack/react-query";



export const DeletePostBtn = ({ postId }: { postId: string }) => {
  return <button onClick={() => mutate()}>Delete</button>;
};
