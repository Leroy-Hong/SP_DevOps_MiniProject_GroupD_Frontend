interface Book {
    _id: string;
    category: string;
    id: string;
    library: string;
    name: string;
    status: bookStatus;
    dueDate: string;
}

interface bookStatus {
    owner: string;
    reserved: string;
  }

export {
    Book
}