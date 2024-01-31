angular.module('meuApp', [])
    .controller('MainController', ['$scope', function ($scope) {
        $scope.user = {};
        $scope.pessoas = [
            { id: 1, nome: 'Pessoa 1', forcaSenhaPercentual: '10%', categoriaSenha: 'Ruim', filhos: [] },
            { id: 2, nome: 'Pessoa 2', forcaSenhaPercentual: '25%', categoriaSenha: 'Boa', filhos: [] },
            { id: 3, nome: 'Pessoa 3', forcaSenhaPercentual: '50%', categoriaSenha: 'Forte', filhos: [] }
        ];

        $scope.save = function (user) {
            var selectedPerson = $scope.pessoas.find(function (pessoa) {
                return pessoa.id === user.hierarchy;
            });

            $scope.logSelectedPerson = function () {
                console.log('user.hierarchy:', $scope.user.hierarchy);
            };

            console.log('selectedPerson:', selectedPerson);
            console.log('user.hierarchy:', user.hierarchy);

            if (selectedPerson) {
                // Adiciona como filho da pessoa selecionada
                selectedPerson.filhos.push({
                    nome: user.name,
                    senha: user.password,
                    filhos: []
                });
            } else {
                // Cria uma nova pessoa se nenhum selecionado
                $scope.pessoas.push({
                    id: $scope.pessoas.length + 1, // Simplesmente adicionando um ID sequencial
                    nome: user.name,
                    senha: user.password,
                    filhos: []
                });
            }

            // Limpa o formulário após salvar
            $scope.user = {};
        };

        $scope.getClass = function (categoriaSenha) {
            switch (categoriaSenha) {
                case 'Ruim':
                    return 'div-categoria categoria-ruim';
                case 'Boa':
                    return 'div-categoria categoria-boa';
                case 'Forte':
                    return 'div-categoria categoria-forte';
                default:
                    return ''; // Adicione uma classe padrão se necessário
            }
        };
    }]);
