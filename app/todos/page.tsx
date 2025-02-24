// app/todos/page.tsx
import React from 'react';
import Todos from '@/components/todos';

export default function TodosPage() {
  return (
    <div className="container mx-auto min-h-screen">
      <Todos />
    </div>
  );
}
