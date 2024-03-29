import Book from "./components/Book";
import { BookType, Purchase } from "./types/types";
import { getAllBooks } from "./lib/microcms/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/options";

export default async function Home() {
  // const [books, setBooks] = useState<BookType[]>([]);
  // const [purchasedBookIds, setPurchasedBookIds] = useState<number[]>([]);

  const session = await getServerSession(nextAuthOptions);
  const user: any = session?.user;

  const { contents } = await getAllBooks();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
  );
  const purchasesData = await response.json();
  const purchasedIds = purchasesData.map(
    (purchase: Purchase) => purchase.bookId
  );

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-20 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            user={user}
            isPurchased={purchasedIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
