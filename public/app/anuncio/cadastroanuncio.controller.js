(function() {

    angular.module('campohouse').controller('CadastroAnuncioCtrl', CadastroAnuncioCtrl);

    // CadastroAnuncioCtrl.$inject = ['$scope', '$location', 'Anuncio', 'toaster'];
    CadastroAnuncioCtrl.$inject = ['$scope', '$timeout', '$location', 'Anuncio', 'toaster', 'Logradouro', 'Options', 'Upload', '$timeout', 'Config', '$http', '$routeParams'];

    // function CadastroAnuncioCtrl($scope, $location, Anuncio, toaster) {
    function CadastroAnuncioCtrl($scope, $timeout, $location, Anuncio, toaster, Logradouro, Options, Upload, $timeout, Config, $http, $routeParams) {

        var resize = new window.resize();
        resize.init();

        $scope.anuncio = {
            sobreTitulo: '',
            sobreDescricao: '',
            numQuartos: 0,
            numBanheiros: 0,
            numCamas: 0,
            precoDiaria: 0,
            oquelevar: '',
            oquenaolevar: '',
            listaComodidades: [],
            listaOfertaValores: [],
            listaArquivos: []
        };

        $scope.tipoImovelOptions = [];
        $scope.numAcomodaOptions = [];
        $scope.comodidades = [];
        $scope.ofertaValores = [];

        //Localizacao
        $scope.map = null;
        $scope.autocomplete = null;
        $scope.marker = null;
        $scope.localizacao = {
            exibir: true
        };

        $scope.finalizarAnuncio = function () {
            $location.path('/meusanuncios');
        };

        $scope.clickLocalizacao = function() {
            $timeout(function() {
                $scope.autoCompleteEndereco();
            }, 500);
        };

        if ($routeParams._id) {

            Anuncio.getEdit($routeParams._id, '')
                .then(function(res) {
                    $scope.anuncio = res.data;

                    Options.getComodidades()
                        .then(function(res) {
                            $scope.comodidades = res.data;

                            if ($scope.anuncio.listaComodidades.length) {

                                for (var i = 0; i < $scope.anuncio.listaComodidades.length; i++) {
                                    for (var j = 0; j < $scope.comodidades.length; j++) {
                                        if ($scope.anuncio.listaComodidades[i] == $scope.comodidades[j]._id) {
                                            $scope.comodidades[j].checked = true;
                                        }
                                    }
                                }

                            }
                            // $scope.anuncio.numAcomoda = $scope.numAcomodaOptions[0]._id;
                        }).catch(function(err) {
                            console.log(err);
                        });

                    Options.getOfertaValores()
                        .then(function(res) {
                            $scope.ofertaValores = res.data;

                            if ($scope.anuncio.listaOfertaValores.length) {

                                for (var i = 0; i < $scope.anuncio.listaOfertaValores.length; i++) {
                                    for (var j = 0; j < $scope.ofertaValores.length; j++) {
                                        if ($scope.anuncio.listaOfertaValores[i] == $scope.ofertaValores[j]._id) {
                                            $scope.ofertaValores[j].checked = true;
                                        }
                                    }
                                }

                            }

                        }).catch(function(err) {
                            console.log(err);
                        });

                }).catch(function(err) {
                    toaster.pop({
                        type: 'error',
                        title: 'Anúncio',
                        body: "Erro ao carregar o anúncio, tente novamente.",
                        showCloseButton: true
                    });
                });

            Logradouro.get($routeParams._id, '')
                .then(function(res) {

                    $scope.localizacao = res.data;

                    // $scope.autoCompleteEndereco();
                }).catch(function(err) {
                    $scope.localizacao = {
                        exibir: true
                    };
                });

        } else {

            // $scope.autoCompleteEndereco();

            Options.getComodidades()
                .then(function(res) {
                    $scope.comodidades = res.data;

                    if ($scope.anuncio.listaComodidades.length) {

                        for (var i = 0; i < $scope.anuncio.listaComodidades.length; i++) {
                            for (var j = 0; j < $scope.comodidades.length; j++) {
                                if ($scope.anuncio.listaComodidades[i] == $scope.comodidades[j]._id) {
                                    $scope.comodidades[j].checked = true;
                                }
                            }
                        }

                    }
                }).catch(function(err) {
                    console.log(err);
                });

            Options.getOfertaValores()
                .then(function(res) {
                    $scope.ofertaValores = res.data;
                }).catch(function(err) {
                    console.log(err);
                });

        }

        Options.getTipoImovel()
            .then(function(res) {
                $scope.tipoImovelOptions = res.data;
                $scope.anuncio.tipoImovel = $scope.tipoImovelOptions[0]._id;
            }).catch(function(err) {
                console.log(err);
            });

        Options.getNumAcomoda()
            .then(function(res) {
                $scope.numAcomodaOptions = res.data;
                $scope.anuncio.numAcomoda = $scope.numAcomodaOptions[0]._id;
            }).catch(function(err) {
                console.log(err);
            });

        $scope.checkComodidade = function(_id) {

            var listaAux = []
            var existe = false;

            for (var i = 0; i < $scope.anuncio.listaComodidades.length; i++) {
                if ($scope.anuncio.listaComodidades[i] == _id) {
                    existe = true;
                } else {
                    listaAux.push($scope.anuncio.listaComodidades[i])
                }
            }

            if (existe) {
                $scope.anuncio.listaComodidades = listaAux;
            } else {
                $scope.anuncio.listaComodidades.push(_id);
            }
        };

        $scope.checkOfertaValor = function(_id) {

            var listaAux = []
            var existe = false;

            for (var i = 0; i < $scope.anuncio.listaOfertaValores.length; i++) {
                if ($scope.anuncio.listaOfertaValores[i] == _id) {
                    existe = true;
                } else {
                    listaAux.push($scope.anuncio.listaOfertaValores[i])
                }
            }

            if (existe) {
                $scope.anuncio.listaOfertaValores = listaAux;
            } else {
                $scope.anuncio.listaOfertaValores.push(_id);
            }
        };



        $scope.salvarAnuncio = function(next) {

            Anuncio.save($scope.anuncio)
                .then(function(res) {

                    $("#tabs-anuncio a[aria-controls='" + next + "']").tab('show');

                    if (next == 'localizacao') {
                        $timeout(function() {
                            $scope.autoCompleteEndereco();
                        }, 500);
                    }

                    $scope.anuncio = res.data;

                    toaster.pop({
                        type: 'success',
                        title: 'Anúncio',
                        body: "Salvo com sucesso.",
                        showCloseButton: true
                    });

                }).catch(function(err) {

                    toaster.pop({
                        type: 'error',
                        title: 'Anúncio',
                        body: "Erro ao salvar, tente novamente.",
                        showCloseButton: true
                    });

                });

        };

        $scope.uploadFiles = function(files, errFiles) {

            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {

                console.log(file);

                if ($scope.anuncio.listaArquivos.length < 20) {

                    $scope.anuncio.listaArquivos.push(file);

                    resize.photo(file, 1024, 'file', function(imagem) {
                        // console.log(imagem);
                        if (!file.result) {

                            file.up = true;

                            var urlImagem = URL.createObjectURL(imagem);

                            var i = new Image();

                            i.onload = function() {

                                file.upload = Upload.upload({
                                    url: Config.getUrlApi() + '/anuncios/' + $scope.anuncio._id + '/imagens?width=' + i.width + '&height=' + i.height,
                                    data: {
                                        file: imagem
                                    }
                                });

                                file.upload.then(function(response) { // success

                                    $timeout(function() {
                                        file.result = response.data;
                                        $scope.anuncio = response.data;

                                    });

                                }, function(response) { // error

                                    $timeout(function() {

                                        toaster.pop({
                                            type: 'error',
                                            title: 'Anúncio',
                                            body: "Erro ao carregar a imagem.",
                                            showCloseButton: true
                                        });

                                    });

                                }, function(evt) { // upload
                                    file.progress = Math.min(100, parseInt(100.0 *
                                        evt.loaded / evt.total));
                                    // console.log(JSON.stringify(file));
                                });

                            };

                            i.src = urlImagem;

                        }
                    });
                } else {
                    toaster.pop({
                        type: 'warning',
                        title: 'Anúncio',
                        body: "São permitidas 20 imagens por anúncio.",
                        showCloseButton: true
                    });
                }
            });
        };

        $scope.deleteImagem = function(file) {
            $http.delete(Config.getUrlApi() + '/anuncios/' + file.anuncio + '/imagens/' + file._id)
                .then(function(res) {

                    var aux = [];

                    for (var i = 0; i < $scope.anuncio.listaArquivos.length; i++) {
                        if ($scope.anuncio.listaArquivos[i]._id != file._id) {
                            aux.push($scope.anuncio.listaArquivos[i]);
                        }
                    }

                    $scope.anuncio.listaArquivos = aux;

                    toaster.pop({
                        type: 'info',
                        title: 'Anúncio',
                        body: "Imagem apagada com sucesso.",
                        showCloseButton: true
                    });

                }).catch(function(err) {
                    toaster.pop({
                        type: 'error',
                        title: 'Anúncio',
                        body: "Erro ao deletar a imagem.",
                        showCloseButton: true
                    });
                });
        };

        $scope.autoCompleteEndereco = function() {

            var optionsAutoComplete = {
                language: 'pt-BR',
                types: ['(cities)'],
                componentRestrictions: {
                    country: "br"
                }
            };

            $scope.autocomplete = new google.maps.places.Autocomplete(document.getElementById('enderecoLocal'), optionsAutoComplete);

            if ($scope.localizacao.lat) {

                $scope.map = new google.maps.Map(document.getElementById('map_canvas'), {
                    center: {
                        lat: $scope.localizacao.lat,
                        lng: $scope.localizacao.lng
                    },
                    zoom: 15
                });

                $('#enderecoLocal').val($scope.localizacao.endereco);

                google.maps.event.addListener($scope.map, 'click', function(event) {
                    if (event.latLng) {
                        $scope.marker.setVisible(true);
                        $scope.marker.setPosition(event.latLng);
                        $timeout(function() {
                            $scope.localizacao.lat = event.latLng.lat();
                            $scope.localizacao.lng = event.latLng.lng();
                        }, 10);
                    }
                });

                $scope.autocomplete.bindTo('bounds', $scope.map);

                $scope.marker = new google.maps.Marker({
                    map: $scope.map,
                    position: {
                        lat: $scope.localizacao.lat,
                        lng: $scope.localizacao.lng
                    },
                    title: "Minha CampuHouse"
                });

                $scope.marker.setVisible(true);
            }


            $scope.autocomplete.addListener('place_changed', function() {
                var place = $scope.autocomplete.getPlace();
                console.log(place);
                if (!place.geometry) {
                    return;
                }

                $timeout(function() {

                    $scope.localizacao.endereco = $('#enderecoLocal').val();
                    $scope.localizacao.lat = place.geometry.location.lat();
                    $scope.localizacao.lng = place.geometry.location.lng();

                    $scope.map = new google.maps.Map(document.getElementById('map_canvas'), {
                        center: {
                            lat: $scope.localizacao.lat,
                            lng: $scope.localizacao.lng
                        },
                        zoom: 15
                    });

                    $scope.autocomplete.bindTo('bounds', $scope.map);

                    google.maps.event.addListener($scope.map, 'click', function(event) {
                        if (event.latLng) {
                            $scope.marker.setVisible(true);
                            $scope.marker.setPosition(event.latLng);
                            $timeout(function() {
                                $scope.localizacao.lat = event.latLng.lat();
                                $scope.localizacao.lng = event.latLng.lng();
                            }, 10);
                        }
                    });

                    $scope.marker = new google.maps.Marker({
                        map: $scope.map,
                        position: {
                            lat: $scope.localizacao.lat,
                            lng: $scope.localizacao.lng
                        },
                        title: "Minha CampoHouse"
                    });

                    $scope.marker.setVisible(true);

                    $scope.marker.setPosition(place.geometry.location);
                    $scope.marker.setVisible(true);
                }, 10);

            });

        };

        $scope.salvarLogradouro = function() {

            $("#tabs-anuncio a[aria-controls='espaco']").tab('show');

            if ($scope.localizacao.endereco) {
                $('#enderecoLocalLabel').removeClass('text-danger');
                $('#enderecoLocal').parent().removeClass('has-error');
            } else {
                $('#enderecoLocalLabel').addClass('text-danger');
                $('#enderecoLocal').parent().addClass('has-error');
            }
            if ($scope.localizacao.lat) {
                $('#mapaa').removeClass('text-danger');
            } else {
                $('#mapaa').addClass('text-danger');
            }


            if ($scope.localizacao.endereco && $scope.localizacao.lat && $scope.localizacao.lng) {

                Logradouro.save($scope.anuncio._id, $scope.localizacao)
                    .then(function(res) {

                        toaster.pop({
                            type: 'success',
                            title: 'Anúncio',
                            body: "Salvo com sucesso.",
                            showCloseButton: true
                        });

                    }).catch(function(err) {

                        toaster.pop({
                            type: 'error',
                            title: 'Anúncio',
                            body: "O Endereço não foi encontrado.",
                            showCloseButton: true
                        });

                    });

            } else {

                toaster.pop({
                    type: 'warning',
                    title: 'Anúncio',
                    body: "Faltam dados na localização.",
                    showCloseButton: true
                });

            }

        };

        // $scope.eventsWizard = function() {
        //
        //
        //     $('#btnVoltarLocal').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='geral']").tab('show');
        //     });
        //
        //
        //     $('#btnVoltarEspaco').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='localizacao']").tab('show');
        //     });
        //
        //     $('#btnVoltarComodidade').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
        //     });
        //
        //     $('#btnVoltarOfertaValor').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
        //     });
        //
        //     $('#btnVoltarPreco').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
        //     });
        //
        //
        //     $('#btnVoltarFotos').on('click', function() {
        //         $("#tabs-anuncio a[aria-controls='preco']").tab('show');
        //     });
        //
        // };

        // $scope.eventsWizard();

    };

})();
