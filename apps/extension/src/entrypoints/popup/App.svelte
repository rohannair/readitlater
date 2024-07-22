<script lang="ts">
  import { onMount } from "svelte";
  import { sendMessage } from "webext-bridge/content-script";
  import { z } from "zod";

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

  export async function handleSubmitUrl() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    await sendMessage(
      "url",
      {
        url: tab.url ?? "",
      },
      `content-script@${tab.id}`
    );
  }

  let email = "";
  let password = "";
  let errorMessage = "";

  async function handleSubmit() {
    errorMessage = "";

    try {
      // Validate input using Zod schema
      loginSchema.parse({ email, password });

      await sendMessage(
        "login",
        {
          email: "",
          password: "",
        },
        "background"
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0].message;
      } else {
        errorMessage = "An error occurred. Please try again later.";
        console.error("Login error:", error);
      }
    }
  }

  onMount(async () => {
    const { token } = await chrome.storage.local.get("token");

    if (token) {
      await handleSubmitUrl();
    }
  });
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
>
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
      >Email:</label
    >
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div class="mb-6">
    <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
      >Password:</label
    >
    <input
      type="password"
      id="password"
      bind:value={password}
      required
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  {#if errorMessage}
    <p class="text-red-500 text-xs italic mb-4">{errorMessage}</p>
  {/if}
  <div class="flex items-center justify-between">
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Sign In
    </button>
  </div>
</form>
