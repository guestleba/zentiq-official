import { redirect } from 'next/navigation';

// Esta página serve apenas para garantir que ninguém fique preso no 404
export default function RootPage() {
  // Redireciona imediatamente para o inglês
  redirect('/en');
}