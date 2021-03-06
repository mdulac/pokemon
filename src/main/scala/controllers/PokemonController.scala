package controllers

import java.io.IOException

import akka.event.LoggingAdapter
import akka.http.scaladsl.client.RequestBuilding
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.stream.Materializer
import model.RequestFailure.{InvalidName, NameNotFound}
import model._
import spray.json._

import scala.concurrent.{ExecutionContext, Future}

class PokemonController(val logger: LoggingAdapter,
                        val pokemonApiRequest: Process[HttpRequest, HttpResponse])
                       (implicit val ec: ExecutionContext, m: Materializer) {

  val fetch: Process[String, Either[RequestFailure, PokemonDetails]] = name => {
    logger.debug(s"Fetching Pokemon $name")
    pokemonApiRequest(RequestBuilding.Get(s"/api/v2/pokemon/$name/")).flatMap { response =>
      response.status match {
        case OK => Unmarshal(response.entity).to[PokemonDetails].map(Right(_))
        case BadRequest => Future.successful(Left(InvalidName(name)))
        case NotFound => Future.successful(Left(NameNotFound(name)))
        case _ =>
          Unmarshal(response.entity).to[String].flatMap { entity =>
            val error = s"Pokeapi request failed with status code ${response.status} and entity $entity"
            logger.error(error)
            Future.failed(new IOException(error))
          }
      }
    }
  }

  val fetchStats: Process[String, Either[RequestFailure, PokemonStats]] = name => {
    logger.debug(s"Fetching Pokemon $name stats")
    pokemonApiRequest(RequestBuilding.Get(s"/api/v2/pokemon/$name/")).flatMap { response =>
      response.status match {
        case OK => Unmarshal(response.entity).to[PokemonStats].map(Right(_))
        case BadRequest => Future.successful(Left(InvalidName(name)))
        case NotFound => Future.successful(Left(NameNotFound(name)))
        case _ =>
          Unmarshal(response.entity).to[String].flatMap { entity =>
            val error = s"Pokeapi request failed with status code ${response.status} and entity $entity"
            logger.error(error)
            Future.failed(new IOException(error))
          }
      }
    }
  }

  val count: Process[Unit, PokemonCount] = _ => {
    logger.debug(s"Counting Pokemon")
    pokemonApiRequest(RequestBuilding.Get("/api/v2/pokemon/?limit=0")).flatMap { response =>
      response.status match {
        case OK =>
          Unmarshal(response.entity).to[PokemonCount]
        case _ =>
          Unmarshal(response.entity).to[String].flatMap { entity =>
            val error = s"Pokeapi request failed with status code ${response.status} and entity $entity"
            logger.error(error)
            Future.failed(new IOException(error))
          }
      }
    }
  }

  val list: Process[BigDecimal, String] = limit => {
    logger.debug(s"Listing Pokemon with $limit limit")
    pokemonApiRequest(RequestBuilding.Get(s"/api/v2/pokemon/?limit=$limit")).flatMap { response =>
      response.status match {
        case OK =>
          Unmarshal(response.entity).to[String]
        case _ =>
          Unmarshal(response.entity).to[String].flatMap { entity =>
            val error = s"Pokeapi request failed with status code ${response.status} and entity $entity"
            logger.error(error)
            Future.failed(new IOException(error))
          }
      }
    }
  }

  val fetchType: Process[String, String] = name => {
    logger.debug(s"Fetching Type $name")
    pokemonApiRequest(RequestBuilding.Get(s"/api/v2/type/$name/")).flatMap { response =>
      response.status match {
        case OK =>
          Unmarshal(response.entity).to[String]
        case _ =>
          Unmarshal(response.entity).to[String].flatMap { entity =>
            val error = s"Pokeapi request failed with status code ${response.status} and entity $entity"
            logger.error(error)
            Future.failed(new IOException(error))
          }
      }
    }
  }

  val statsAverage: Process[String, List[(String, Float)]] = name => {
    logger.debug(s"Fetching Pokemon $name stats")
    fetch(name).flatMap {
      case Right(pokemon) =>
        for {
          types <- Future.sequence(pokemon.types.map(t => fetchType(t.name)))
          pokemonNames <- Future.successful(types.head.parseJson.convertTo[List[PokemonName]])
          results <- Future.sequence(pokemonNames.map(pokemonName => fetchStats(pokemonName.name)))
          stats <- Future.successful(results.collect {
            case Right(stat) => stat
          }.flatMap(_.stats))
        } yield Stat.averageOf(stats)
      case Left(cause) =>
        Future.failed(new IOException(cause.message))
    }
  }

}
