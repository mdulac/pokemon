package routes

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.marshalling.ToResponseMarshallable
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{ContentTypes, HttpEntity}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.PathMatchers.Segment
import akka.http.scaladsl.server.Route
import controllers.PokemonController

import scala.concurrent.ExecutionContext

object Routes {

  def apply(controller: PokemonController)(implicit ec: ExecutionContext): Route =
    logRequestResult("pokemon-service") {
      get {
        pathSingleSlash {
          complete {
            HttpEntity(ContentTypes.`text/html(UTF-8)`,
              """
                |<html>
                | <body>
                |   Hello world!
                | </body>
                |</html>
                |""".stripMargin)
          }
        } ~
          pathPrefix("stats") {
            path(Segment) { name =>
              complete {
                controller.statsAverage(name).map[ToResponseMarshallable] { v =>
                  v.map { case (n, value) => s""" "$n" : $value """ }.mkString("{", ",", "}")
                }
              }
            }
          } ~
          pathPrefix("pokemon") {
            pathEndOrSingleSlash {
              complete {
                controller.count(()).map[ToResponseMarshallable] {
                  pokemonCount =>
                    controller.list(pokemonCount.count)
                }
              }
            } ~
              path(Segment) { name =>
                complete {
                  controller.fetch(name).map[ToResponseMarshallable] {
                    case Right(pokemon) => pokemon
                    case Left(cause) => BadRequest -> cause.message
                  }
                }
              }
          }
      }
    }
}
