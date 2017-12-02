<template>
    <nav class="flex items-center justify-between flex-wrap border-t-4 border-teal p-6 border-b-2 border-b-grey">
        <div class="flex items-center flex-no-shrink mr-6">
            <router-link to="/" tag="span" class="font-semibold text-xl tracking-tight cursor-pointer">
                Varie
            </router-link>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <router-link :to="{ name : 'docs', params : { version : 'latest', page : 'installation' } }" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-teal mr-4">
                    Docs
                </router-link>
            </div>
            <div>
                <a href="https://github.com/variejs/varie" target="_blank" class="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-lighter border-teal-lighter hover:text-white hover:bg-teal mt-4 lg:mt-0">GitHub</a>
            </div>
        </div>
    </nav>
</template>