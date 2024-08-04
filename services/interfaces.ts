interface Book {
    _id: string;
    id: string;
    name: string;
    library: string;
    desc: string;
    author: string;
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