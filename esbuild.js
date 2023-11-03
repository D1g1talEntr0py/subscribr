import LibraryBuilder from 'esbuild-library';

await LibraryBuilder.cleanAndBuild({ ecma: 2022, iife: true });