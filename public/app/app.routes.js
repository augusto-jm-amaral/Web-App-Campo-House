(function () {
  'use strict';

  angular.module('campohouse')
    .config(config)
    .run(run);

    // run.$inject = ['']

    function run($rootScope, $location, Login) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

          if (nextRoute.access && nextRoute.access.loginRequerido) {
            if(!Login.islogin()){
                $location.path('/entrar');
            }
          }

        });
    };

    function config($routeProvider, $httpProvider) {

      $httpProvider.interceptors.push('TokenInterceptor');

      $routeProvider.when('/home', {
        templateUrl: 'app/home/home2.html',
        controller: 'HomeCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/home', {
        templateUrl: 'app/home/home2.html',
        controller: '',
        access: {
          loginRequerido: false
        }
      })
      .when('/buscaranuncio', {
        templateUrl: 'app/anuncio/buscaranuncio.html',
        controller: 'BuscarAnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/buscaranuncio/:_nomeCidade', {
        templateUrl: 'app/anuncio/buscaranuncio.html',
        controller: 'BuscarAnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/anuncio/:_id', {
        templateUrl: 'app/anuncio/anuncio.html',
        controller: 'AnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/cadastroanuncio', {
        templateUrl: 'app/anuncio/cadastroanuncio.html',
        controller: 'CadastroAnuncioCtrl',
        access: {
          loginRequerido: true
        }
      })
      .when('/cadastroanuncio/:_id', {
        templateUrl: 'app/anuncio/cadastroanuncio.html',
        controller: 'CadastroAnuncioCtrl',
        access: {
          loginRequerido: true
        }
      })
      .when('/meusanuncios', {
        templateUrl: 'app/anuncio/meusanuncios.html',
        controller: 'MeusAnunciosCtrl',
        access: {
          loginRequerido: true
        }
      })
      .when('/quemsomos', {
        templateUrl: 'app/sobrenos/quemsomos.html',
        // controller: 'QCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/caixademensagens', {
        templateUrl: 'app/mensagem/mensagens.html',
        controller: 'MensagensCtrl',
        access: {
          loginRequerido: true
        }
      })
      .when('/privacidade', {
        templateUrl: 'app/sobrenos/politicaprivacidade.html',
        // controller: 'QCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/termos', {
        templateUrl: 'app/sobrenos/termos.html',
        // controller: 'QCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/comofunciona', {
        templateUrl: 'app/sobrenos/comofunciona.html',
        // controller: 'QCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/faleconosco', {
        templateUrl: 'app/faleconosco/faleconosco.html',
        controller: 'FaleConoscoCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/entrar', {
        templateUrl: 'app/entrar/entrar.html',
        controller: 'EntrarCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/planos', {
        templateUrl: 'app/planos/planos.html',
        access: {
          loginRequerido: false
        }
      })
      .when('/planosucesso/:_success/:_numplano', {
        templateUrl: 'app/planos/planosucesso.html',
        access: {
          loginRequerido: false
        }
      })
      .when('/validarcadastro/:_hash', {
        templateUrl: 'app/validarcadastro/validarcadastro.html',
        access: {
          loginRequerido: false
        }
      })
      .when('/meusdados', {
        templateUrl: 'app/usuario/usuario.html',
        access: {
          loginRequerido: true
        }
      })
      ;

      $routeProvider.otherwise({redirectTo: '/home'});

    };

})();
