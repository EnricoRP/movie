## 📌 Tips
    🔹  Untuk prop handler seperti onClick, onChange, atau setSearchTerm, jangan pakai tanda kurung kecuali kamu sengaja mau memanggilnya langsung (yang jarang sekali benar di JSX).
    
    🔸  Contoh Salah:  

    ```jsx
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm()}/>
    ```
    🔸 Contoh Benar:

    ```jsx
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    ``` 

    ℹ️ Summary
      🔹 Jika fungsi di parsingkan ke prop dengan () maka fungsi itu akan langsung dipanggil ketika komponen tersebut di render.
##