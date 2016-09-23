import akka.event.NoLogging
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model.ContentTypes._
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.http.scaladsl.testkit.ScalatestRouteTest
import akka.stream.scaladsl.Flow
import model.PokemonCount
import org.scalatest._
import spray.json
import spray.json.DefaultJsonProtocol._
import spray.json._

class ServiceSpec extends FlatSpec with Matchers with ScalatestRouteTest with Service {

  override def testConfigSource = "akka.loglevel = WARNING"

  override def config = testConfig

  override val logger = NoLogging

  val pokemonCount = PokemonCount(2)

  val pokemonList =
    """{
      |	"count": 811,
      |	"previous": null,
      |	"results": [
      |		{
      |			"url": "http://pokeapi.co/api/v2/pokemon/1/",
      |			"name": "bulbasaur"
      |		},
      |		{
      |			"url": "http://pokeapi.co/api/v2/pokemon/2/",
      |			"name": "ivysaur"
      |		}
      |	],
      |	"next": "http://pokeapi.co/api/v2/pokemon/?limit=2&offset=2"
      |}""".stripMargin

  override lazy val pokemonApiConnectionFlow = Flow[HttpRequest].map { r =>
    if (r.uri.toString().endsWith("?limit=0"))
      HttpResponse(
        status = OK,
        entity =
          marshal("""{
                    |	"count": 2,
                    |	"previous": null,
                    |	"results": [],
                    |	"next": "http://pokeapi.co/api/v2/pokemon/?limit=0&offset=0"
                    |}""".stripMargin.parseJson.convertTo[json.JsObject]))
    else if (r.uri.toString().endsWith("?limit=2"))
      HttpResponse(
        status = OK,
        entity =
          marshal(pokemonList.parseJson.convertTo[json.JsObject]))
    else
      HttpResponse(status = BadRequest)
  }

  "Service" should "respond to list pokemon" in {
    Get("/pokemon/") ~> routes ~> check {
      status shouldBe OK
      contentType shouldBe `text/plain(UTF-8)`
      responseAs[String].parseJson shouldBe pokemonList.parseJson
    }
  }

}
