import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb"
import { BiTrash } from "react-icons/bi"

export default function Products (){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    })
  }, []);
  return (
    <Layout>
      <Link href={'/products/new'} className=" bg-blue-900 text-white px-2 py-2 rounded-md capitalize" >
        Add new product
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <td className="uppercase font-semibold">Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link href={'/products/edit/'+ product._id}>
                  <TbEdit />
                 Edit
                </Link>
                <Link href={'/products/delete/'+ product._id}>
                  <BiTrash />
                 Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}