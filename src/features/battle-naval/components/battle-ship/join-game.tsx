import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useBattleNavalContext } from "../../hooks/useBattleNavalContext";

const formSchema = z.object({
  game: z.string().min(2).max(90),
});

export const JoinGame = () => {
  const { dispatch, contractAddress, isLoading, state, isClientInitialized } =
    useBattleNavalContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    joinContract(values.game);
  }

  const joinContract = async (inputAddress: string): Promise<void> => {
    await dispatch({ type: "join", contractAddress: inputAddress });
    console.log("junte no contrato");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <FormField
          control={form.control}
          name="game"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[160px] rounded-[10px] placeholder:text-gray-400"
                  placeholder="Contract number "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit rounded-[8px] bg-gray-700 hover:bg-gray-700/80
                disabled:bg-gray-500">
          Join Existing Game
        </Button>
      </form>
    </Form>
  );
};
