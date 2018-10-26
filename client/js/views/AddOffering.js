module.exports = Object.assign({}, require('./__proto__'), {
    events: {
        submit: 'click'
    },

    async onSubmitClick(e) {
        e.preventDefault()
        if (this.els.name.value.trim() == "") {
            return
        }
        const mutation = this.gql`mutation addTwoProducts($input: ProductInput!, $input2: ProductInput!) {
            firstAdd: addProduct(input: $input) {
                id
            }
            secondAdd: addProduct(input: $input2) {
                id
            }
        }`
        try {
            const result = await this.apolloClient.mutate({
                mutation, variables: {
                    input: {
                        name: this.els.name.value,
                        quantity: this.els.quantity.value
                    },
                    input2: {
                        name: "Test",
                        quantity: 1
                    }
                }
            })
            console.log(result)
        } 
        catch (e) {
            console.log(e)
            this.Toast.showMessage('error', '...')
        }
    }
})