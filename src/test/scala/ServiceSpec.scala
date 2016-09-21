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

  val pokemonCount = PokemonCount(10)

  override lazy val pokemonApiConnectionFlow = Flow[HttpRequest].map { _ =>
    HttpResponse(
      status = OK,
      entity =
        marshal("""{
                  |	"count": 10,
                  |	"previous": null,
                  |	"results": [],
                  |	"next": "http://pokeapi.co/api/v2/pokemon/?limit=0&offset=0"
                  |}""".stripMargin.parseJson.convertTo[json.JsObject]))
  }

  "Service" should "respond to count pokemon" in {
    Get("/pokemon/_count") ~> routes ~> check {
      status shouldBe OK
      contentType shouldBe `application/json`
      responseAs[PokemonCount] shouldBe pokemonCount
    }
  }

}
