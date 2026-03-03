import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main class="grid md:grid-cols-2 gap-4 p-8 min-h-screen bg-brand-admin">
      <section class="hidden md:flex flex-col gap-10 justify-center items-center text-center">
        <div class="max-w-[528px]">
          <img src="/assets/images/graphs.png" alt="Afri transfer admin portal" />
        </div>
        <div class="text-white max-w-[417px]">
          <h2 class="font-semibold uppercase text-2xl">{{ title }}</h2>
          <p class="text-gray-300 text-center">
            {{ paragraph }}
          </p>
        </div>
      </section>
      <section class="w-full min-w-0 min-[440px]:min-w-[440px] bg-white rounded-xl py-16 px-10">
        <a routerLink="/auth/login" class="block mb-8 w-max mx-auto" aria-label="Afri Transfer home">
          <img src="/assets/icons/logo.svg" alt="" class="h-10 w-auto" />
        </a>
        <router-outlet />
      </section>
    </main>
  `,
  styles: ``,
})
export default class AuthLayout {
  title: string = 'Afri transfer admin portal';
  paragraph: string = `Manage users and streamline operations—all in one secure portal. You're just a step away from smarter administration.`;
}
