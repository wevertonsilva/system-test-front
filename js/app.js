var ngModule = angular.module('meuApp', []);

ngModule.constant('config', {
    apiUrl: 'http://localhost:8080',
    baseUrl: '/',
    enableDebug: true
});

ngModule.controller('MainController', ['$scope', '$http', 'config', function ($scope, $http, config) {
    $scope.user = {};
    $scope.pessoas = [
        {
            "id": 10,
            "nome": "Robertinho",
            "forcaSenhaPercentual": 100,
            "categoriaSenha": "MEDIANA",
            "categoriaSenhaFormatada": "Mediana",
            "filhos": [
                {
                    "id": 11,
                    "nome": "Robertinho 1",
                    "forcaSenhaPercentual": 44,
                    "categoriaSenha": "FORTE",
                    "categoriaSenhaFormatada": "Forte",
                    "filhos": [
                        {
                            "id": 12,
                            "nome": "Robertinho 2",
                            "forcaSenhaPercentual": 44,
                            "categoriaSenha": "BOA",
                            "categoriaSenhaFormatada": "Boa",
                            "filhos": [
                                {
                                    "id": 13,
                                    "nome": "Robertinho 3",
                                    "forcaSenhaPercentual": 44,
                                    "categoriaSenha": "FORTE",
                                    "categoriaSenhaFormatada": "Forte",
                                    "filhos": []
                                }
                            ]
                        },
                    ]
                },
                {
                    "id": 14,
                    "nome": "Robertinho",
                    "forcaSenhaPercentual": 44,
                    "categoriaSenha": "MEDIANA",
                    "categoriaSenhaFormatada": "Mediana",
                    "filhos": []
                }
            ]
        }
    ];

    $scope.toggleExpand = function (pessoa) {
        pessoa.expanded = !pessoa.expanded;
        angular.forEach(pessoa.filhos, function (filho) {
            filho.expanded = pessoa.expanded;
        });
    };

    $scope.save = function (user) {
        var novaPessoa = {
            nome: user.name,
            senha: user.password,
            usuarioPai: user.hierarchy ? { id: user.hierarchy } : null
        };

        $http.post(config.apiUrl + '/usuarios', novaPessoa)
            .then(function (response) {
                console.log('Nova pessoa criada com sucesso:', response.data);
                // $scope.carregarPessoas();
            })
            .catch(function (error) {
                console.error('Erro ao criar nova pessoa:', error);
            });

        // var selectedPerson = $scope.pessoas.find(function (pessoa) {
        //     return pessoa.id === user.hierarchy;
        // });

        // if (selectedPerson) {
        //     // Adiciona como filho da pessoa selecionada
        //     selectedPerson.filhos.push({
        //         nome: user.name,
        //         senha: user.password,
        //         filhos: []
        //     });

        //     // Atualiza a pessoa no backend
        //     // $http.put('/api/pessoas/' + selectedPerson.id, selectedPerson)
        //     //     .then(function (response) {
        //     //         console.log('Pessoa atualizada com sucesso:', response.data);
        //     //     })
        //     //     .catch(function (error) {
        //     //         console.error('Erro ao atualizar pessoa:', error);
        //     //     });
        // } else {
        //     // Cria uma nova pessoa no backend
        //     var novaPessoa = {
        //         nome: user.name,
        //         senha: user.password,
        //         usuarioPai: user.hierarchy ? { id: user.hierarchy } : null
        //     };

        //     $http.post(config.apiUrl + '/usuarios', novaPessoa)
        //         .then(function (response) {
        //             console.log('Nova pessoa criada com sucesso:', response.data);
        //             // $scope.carregarPessoas();
        //         })
        //         .catch(function (error) {
        //             console.error('Erro ao criar nova pessoa:', error);
        //         });
        // }

        $scope.user = {};
    };

    $scope.getClass = function (categoriaSenha) {
        switch (categoriaSenha) {
            case 'RUIM':
                return 'div-categoria categoria-ruim';
            case 'BOA':
                return 'div-categoria categoria-boa';
            case 'FORTE':
                return 'div-categoria categoria-forte';
            case 'MEDIANA':
                return 'div-categoria categoria-mediana';
            default:
                return '';
        }
    };
}]);
