import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { reactive } from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = reactive(useStorage('carrinho-itens', []))

  function adicionarItem(item) {
    const existente = itens.value.find((i) => i.id === item.id)
    if (existente) {
      existente.quantidade += item.quantidade || 1
    } else {
      itens.value.push({
        ...item,
        quantidade: item.quantidade || 1,
      })
    }
  }

  function removerItem(itemId) {
    const index = itens.value.findIndex((i) => i.id === itemId)
    if (index > -1) {
      itens.value.splice(index, 1)
    }
  }

  function limparCarrinho() {
    itens.value.splice(0, itens.length)
  }

  const totalItens = () => {
    return itens.value.reduce((total, item) => total + (parseInt(item.quantidade) || 0), 0)
  }

  const totalPreco = () => {
    return itens.value.reduce((total, item) => {
      const preco = parseFloat(item.preco) || 0
      const quantidade = parseInt(item.quantidade) || 0
      return total + preco * quantidade
    }, 0)
  }

  return { itens, adicionarItem, removerItem, limparCarrinho, totalItens, totalPreco }
})
