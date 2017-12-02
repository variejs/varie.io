<template>
    <nav class="navigation flex items-center justify-between flex-wrap border-t-4 border-teal p-6 border-b-2">
        <div class="flex items-center flex-no-shrink mr-6">
            <router-link to="/" tag="span" class="font-semibold text-xl tracking-tight cursor-pointer">
                Varie
            </router-link>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="lg:flex-grow">
                <input class="appearance-none p-6 -mt-6 -mb-6 ml-8 w-full bg-transparent border-r-2" type="text" placeholder="Search" name="search">
            </div>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="lg:flex-grow">
                <router-link :to="{ name : 'docs', params : { version : 'latest', page : 'installation' } }">
                    Docs
                </router-link>
                <a href="https://github.com/variejs/varie" target="_blank"><i class="fa fa-github"></i></a>
            </div>
        </div>
    </nav>
</template>