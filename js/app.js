var ngModule = angular.module('meuApp', []);

ngModule.constant('config', {
    apiUrl: 'http://localhost:8080',
    baseUrl: '/',
    enableDebug: true
});

ngModule.controller('MainController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    $scope.user = {};
    $scope.pessoas = [];
    $scope.pessoasToSelect = [];

    // Função para expandir e recolher categorias
    $scope.toggleExpand = function (pessoa) {
        pessoa.expanded = !pessoa.expanded;
        angular.forEach(pessoa.filhos, function (filho) {
            filho.expanded = pessoa.expanded;
        });
    };


    // Função para buscar usuários cadastrados
    $scope.carregarPessoas = function () {
        $http.get(config.apiUrl + '/usuarios/listas/nomes')
            .then(function (response) {
                $scope.pessoas = response.data;
                $scope.carregarPessoasParaSelect($scope.pessoas);
                expandAll($scope.pessoas);
            })
            .catch(function (error) {
                console.error('Erro ao carregar pessoas:', error);
            });
    };

    // Função para filtrar os objetos e aplicar no select
    $scope.carregarPessoasParaSelect = function (pessoas) {
        angular.forEach(pessoas, function (pessoa) {
            var itemExistente = $scope.pessoasToSelect.some(function (item) {
                return item.id === pessoa.id;
            });

            if (!itemExistente) {
                $scope.pessoasToSelect.push({ id: pessoa.id, nome: pessoa.nome });
            }

            // Verifica se a pessoa possui filhos e chama a função recursivamente
            if (pessoa.filhos && pessoa.filhos.length > 0) {
                $scope.carregarPessoasParaSelect(pessoa.filhos);
            }
        });
    };

    // Função para expandir todos os itens recursivamente
    function expandAll(items) {
        items.forEach(function (item) {
            item.expanded = true;
            if (item.filhos && item.filhos.length > 0) {
                expandAll(item.filhos);
            }
        });
    }

    $scope.carregarPessoas();

    // Função para salvar um novo usuário
    $scope.save = function (user) {
        var novaPessoa = {
            nome: user.name,
            senha: user.password,
            usuarioPai: user.hierarchy ? { id: user.hierarchy } : null
        };

        $http.post(config.apiUrl + '/usuarios', novaPessoa)
            .then(function (response) {
                $scope.carregarPessoas();
            })
            .catch(function (error) {
                console.error('Erro ao criar nova pessoa:', error);
            });

        $scope.user = {};
    };

    // Função para definir a classe da senha
    $scope.getClass = function (categoriaSenha) {
        switch (categoriaSenha) {
            case 'MUITO_FRACA':
                return 'div-categoria categoria-ruim';
            case 'FRACA':
                return 'div-categoria categoria-fraca';
            case 'MEDIANA':
                return 'div-categoria categoria-mediana';
            case 'BOA':
                return 'div-categoria categoria-boa';
            case 'FORTE':
                return 'div-categoria categoria-forte';
            default:
                return '';
        }
    };
}]);
