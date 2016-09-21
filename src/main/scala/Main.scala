import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.stream.scaladsl.{Flow, Sink, Source}
import akka.stream.{ActorMaterializer, Materializer}
import com.typesafe.config.{Config, ConfigFactory}
import controllers.{PokemonController, Process}
import routes.Routes

import scala.concurrent.ExecutionContextExecutor

trait Service {

  implicit def system: ActorSystem

  implicit def executor: ExecutionContextExecutor

  implicit def materializer: Materializer

  def config: Config

  def logger: LoggingAdapter

  lazy val pokemonApiConnectionFlow: Flow[HttpRequest, HttpResponse, Any] =
    Http().outgoingConnection(config.getString("services.pokemon-api.host"), config.getInt("services.pokemon-api.port"))

  val pokemonApiRequest: Process[HttpRequest, HttpResponse] = request =>
    Source
      .single(request)
      .via(pokemonApiConnectionFlow)
      .runWith(Sink.head)

  lazy val controller = new PokemonController(logger, pokemonApiRequest)
  lazy val routes = Routes(controller)

}

object Main extends App with Service {

  override implicit val system = ActorSystem()
  override implicit val executor = system.dispatcher
  override implicit val materializer = ActorMaterializer()

  override val config = ConfigFactory.load()
  override val logger = Logging(system, getClass)

  Http().bindAndHandle(
    routes,
    config.getString("http.interface"),
    config.getInt("http.port")
  )

}
